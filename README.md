#  Nocturne

### Find music that feels like you.

Nocturne is an AI-powered music discovery web application designed to help users discover music based on their mood and vibes , explore different genres, and build a personal collection of favourite songs and artists.

Instead of relying only on traditional searches, Nocturne lets users describe the music they're in the mood for and discover tracks through AI-assisted recommendations and Spotify integration.

---

## ✨ Features

- **🎧 Vibe Discovery** — Describe a mood, feeling, or atmosphere and discover music based on your vibe.
- **🎵 Discover Music** — Search for artists and explore tracks through Spotify.
- **🎸 Genre Exploration** — Explore music across genres and discover artists and songs associated with them.
- **💜 Personal Favourites** — Save favourite songs and artists to revisit them later.
- **🔐 User Authentication** — Sign up and log in with securely hashed passwords.
- **☁️ Persistent Storage** — Store user information and favourites in MongoDB so your collection persists between sessions.
- **🔄 Spotify API Integration** — Retrieve music data using Spotify's Web API, including access-token refresh handling.
- **🌌 Dark, Minimal UI** — A black-and-purple interface designed around a late-night music discovery aesthetic.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React + Vite | Frontend and development tooling |
| Tailwind CSS | Styling and responsive UI |
| React Router | Client-side navigation |
| Redux Toolkit | Authentication and application state |
| Node.js + Express | Backend API and server logic |
| MongoDB + Mongoose | Database and data persistence |
| Spotify Web API | Artist and track discovery |
| Google Gemini API | AI-assisted music recommendations |
| bcryptjs | Password hashing |

## 📁 Project Structure

```text
Nocturne/
├── Backend/
│   ├── model/
│   │   └── user.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── nocturne/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Home.jsx
│   │   │   ├── Favourites.jsx
│   │   │   ├── Flashcard.jsx
│   │   │   └── Suggestions.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

*The structure above highlights the main project files; additional components and configuration files may exist.*


## 🗺️ Future Improvements

- Improve recommendation relevance for more nuanced moods and descriptions.
- Refine loading states and error handling.
- Expand music discovery and filtering options.
- Improve deployment and production configuration.

## 💭 Motivation

Music is often more than a genre or an artist. Sometimes, you know exactly how you want something to *feel*, but not what to search for.

Nocturne explores a more personal approach to music discovery: describe the vibe, discover the sound.

---

**Built with 🎧, curiosity, and a love for music.**