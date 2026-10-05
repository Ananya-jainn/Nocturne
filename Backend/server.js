require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./model/user");
const bcrypt = require("bcryptjs")


const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");


const app = express();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


app.use(cors())
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

app.get("/", (req, res) => {
  res.send("Nocturne backend is working!");
  
});
const getSpotifyToken = async () => {
  const response = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
    }
  );
const data = await response.json();

console.log("Spotify token response:", data);

return data.access_token;
};

const searchSpotifyTracks = async (searchTerm, genre, spotifyToken) => {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      searchTerm
    )}&type=track&limit=10&market=IN`,
    {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    }
  );

  const data = await response.json();

  console.log("Spotify search:", searchTerm);
  console.log("Spotify total:", data.tracks?.total);
  console.log("Spotify error:", data.error);

  return data.tracks?.items || [];
};

app.post("/vibe", async (req, res) => {



  const {vibe} = req.body
  console.log(req.body);
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: `
      The user wants music based on this vibe:

      "${vibe}"

      Analyze this vibe and return ONLY valid JSON in this format:

      {
        "moods": [],
        "genres": [],
        "artists":[],
        "searchTerms": []
      }

      Do not recommend songs. Only interpret the user's music vibe.
    `,
  });
  const cleanedText = response.text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

  const vibeData = JSON.parse(cleanedText);

  console.log(vibeData);

  const spotifyToken = await getSpotifyToken();

  const genre = vibeData.genres[0];

  const results = await Promise.all(
  vibeData.searchTerms.map((term) =>
    searchSpotifyTracks(term, genre , spotifyToken)
  )
);

const tracks = results.flat();


const uniqueTracks = tracks.filter(
  (track, index, self) =>
    index ===
    self.findIndex(
      (t) =>
        t.name.toLowerCase() === track.name.toLowerCase() &&
        t.artists[0]?.name.toLowerCase() ===
          track.artists[0]?.name.toLowerCase()
    )
);
  console.log("Spotify token:", spotifyToken);
  console.log("tracks output" , uniqueTracks);

  res.json({
  moods: vibeData.moods,
  genres: vibeData.genres,
  tracks: uniqueTracks.slice(0, 15),
});
});



app.post("/sign-up", async (req, res) => {
 try { const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  console.log(user);
  await user.save();
  res.json({
    message: "Account created successfully",
  });
 }  catch(error){
      console.log("sign-up error:",error);
      if (error.code === 11000) {
          res.status(400).json({
             message: "An account with this email already exists",
          });
      }else {
        res.status(500).json({
          message: "Something went wrong",
        });
    };
  }
});

app.post("/login",async(req,res) => {
  try{
    const{ email , password } = req.body;
    const user = await User.findOne({email});

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );
    if (!user || !isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  }catch(error){
    console.log("login-page-error:",error)
  }
})


app.post("/favorites/song", async (req, res) => {
  try {
    const { userId, song } = req.body;

    const user = await User.findById(userId);

    user.favoriteSongs.push(song);

    await user.save();

    res.json({
      message: "Song added to favorites",
    });

  } catch (error) {
    console.log("add favorite song error:", error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.delete("/favorites/song", async (req, res) => {
  try {
    const { userId, songId } = req.body;

    const user = await User.findById(userId);

    user.favoriteSongs = user.favoriteSongs.filter(
      (song) => song.id !== songId
    );

    await user.save();

    res.json({
      message: "Song removed from favorites",
    });

  } catch (error) {
    console.log("remove favorite song error:", error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.post("/favorites/artist", async (req, res) => {
  try {
    const { userId, artist } = req.body;

    const user = await User.findById(userId);

    user.favoriteArtists.push(artist);

    await user.save();

    res.json({
      message: "Artist added to favorites",
    });

  } catch (error) {
    console.log("add favorite artist error:", error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.delete("/favorites/artist", async (req, res) => {
  try {
    const { userId, artistId } = req.body;

    const user = await User.findById(userId);

    user.favoriteArtists = user.favoriteArtists.filter(
      (artist) => artist.id !== artistId
    );

    await user.save();

    res.json({
      message: "Artist removed from favorites",
    });

  } catch (error) {
    console.log("remove favorite artist error:", error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});



app.get("/favorites/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    res.json({
      artists: user.favoriteArtists,
      songs: user.favoriteSongs,
    });

  } catch (error) {
    console.log("get favorites error:", error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});