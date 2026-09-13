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

const searchSpotifyTracks = async (searchTerm, spotifyToken) => {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      searchTerm
    )}&type=track&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    }
  );

  const data = await response.json();

  return data.tracks.items;
};

app.post("/vibe", async (req, res) => {



  const {vibe} = req.body
  console.log(req.body);
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
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
  const tracks = await searchSpotifyTracks(
    vibeData.searchTerms[0],
    spotifyToken
  );
  console.log("Spotify token:", spotifyToken);
  console.log("tracks output" , tracks);

  res.json({
  moods: vibeData.moods,
  genres: vibeData.genres,
  tracks: tracks,
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
} catch(error){
  console.log("sign-up error:",error);
  if (error.code === 11000) {
    res.status(400).json({
      message: "An account with this email already exists",
    });
  } else {
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
        name: user.name,
        email: user.email
      }
    });

  }catch(error){
    console.log("login-page-error:",error)
  }
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});