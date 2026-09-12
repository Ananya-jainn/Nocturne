import { useState } from "react";

const favouriteSongs = [
  {
    id: 1,
    name: "After Hours",
    artist: "The Weeknd",
    image: "https://placehold.co/300",
  },
  {
    id: 2,
    name: "Swim",
    artist: "Chase Atlantic",
    image: "https://placehold.co/300",
  },
  {
    id: 3,
    name: "Space Song",
    artist: "Beach House",
    image: "https://placehold.co/300",
  },
  {
    id: 4,
    name: "Apocalypse",
    artist: "Cigarettes After Sex",
    image: "https://placehold.co/300",
  },
];

const favouriteArtists = [
  {
    id: 1,
    name: "Chase Atlantic",
    image: "https://placehold.co/300",
  },
  {
    id: 2,
    name: "The Weeknd",
    image: "https://placehold.co/300",
  },
  {
    id: 3,
    name: "Tame Impala",
    image: "https://placehold.co/300",
  },
  {
    id: 4,
    name: "Beach House",
    image: "https://placehold.co/300",
  },
];

function Favourites() {
  const [activeTab, setActiveTab] = useState("songs");
  return (
    <div className="min-h-screen bg-black px-6 py-10 text-[#faebd7]">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}

        <div className="mb-12">
          <h1 className="font-display text-5xl font-semibold tracking-tight">
            FAVOURITES
          </h1>

          <p className="mt-3 text-[#faebd7]/60">
            The music you keep coming back to.
          </p>
        </div>

        {/* Tabs */}

        <div className="mb-10 flex gap-8 border-b border-[#faebd7]/15">
          <button
            onClick={() => setActiveTab("songs")}
            className={`pb-3 text-sm transition ${
              activeTab === "songs"
                ? "border-b-2 border-[#ad46e4] text-[#faebd7]"
                : "text-[#faebd7]/50 hover:text-[#faebd7]"
            }`}
          >
            SONGS
          </button>

          <button
            onClick={() => setActiveTab("artists")}
            className={`pb-3 text-sm transition ${
              activeTab === "artists"
                ? "border-b-2 border-[#ad46e4] text-[#faebd7]"
                : "text-[#faebd7]/50 hover:text-[#faebd7]"
            }`}
          >
            ARTISTS
          </button>
        </div>

        {/* Songs */}

        {activeTab === "songs" && (
          <div className="grid gap-4">
            {favouriteSongs.map((song) => (
              <div
                key={song.id}
                className="group flex items-center justify-between rounded-2xl border border-[#faebd7]/10 p-4 transition hover:border-[#ad46e4]/60"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={song.image}
                    alt={song.name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />

                  <div>
                    <h2 className="font-medium">{song.name}</h2>

                    <p className="mt-1 text-sm text-[#faebd7]/55">
                      {song.artist}
                    </p>
                  </div>
                </div>

                <button className="text-lg text-[#ad46e4]">
                 &#9829; 
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Artists */}

        {activeTab === "artists" && (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {favouriteArtists.map((artist) => (
              <div
                key={artist.id}
                className="group cursor-pointer"
              >
                <div className="aspect-square overflow-hidden rounded-2xl bg-[#1a1a1a]">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <h2 className="mt-3 text-sm font-medium">
                  {artist.name}
                </h2>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Favourites;
