require("dotenv").config();


const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");


const app = express();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


app.use(cors())
app.use(express.json());

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

  res.json(vibeData);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});