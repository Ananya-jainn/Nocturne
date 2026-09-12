import { useState } from "react";

const genres = [
  {
    name: "POP",
    songs: [
      {
        name: "Song Name",
        artist: "Artist Name",
        image: "https://placehold.co/300",
      },
      {
        name: "Song Name",
        artist: "Artist Name",
        image: "https://placehold.co/300",
      },
      {
        name: "Song Name",
        artist: "Artist Name",
        image: "https://placehold.co/300",
      },
      {
        name: "Song Name",
        artist: "Artist Name",
        image: "https://placehold.co/300",
      },
      {
        name: "Song Name",
        artist: "Artist Name",
        image: "https://placehold.co/300",
      },
    ],
  },

  {
    name: "INDIE",
    songs: [
      {
        name: "Song Name",
        artist: "Artist Name",
        image: "https://placehold.co/300",
      },
      {
        name: "Song Name",
        artist: "Artist Name",
        image: "https://placehold.co/300",
      },
      {
        name: "Song Name",
        artist: "Artist Name",
        image: "https://placehold.co/300",
      },
      {
        name: "Song Name",
        artist: "Artist Name",
        image: "https://placehold.co/300",
      },
      {
        name: "Song Name",
        artist: "Artist Name",
        image: "https://placehold.co/300",
      },
    ],
  },

  {
    name: "R&B",
    songs: [
      {
        name: "Song Name",
        artist: "Artist Name",
        image: "https://placehold.co/300",
      },
      {
        name: "Song Name",
        artist: "Artist Name",
        image: "https://placehold.co/300",
      },
      {
        name: "Song Name",
        artist: "Artist Name",
        image: "https://placehold.co/300",
      },
      {
        name: "Song Name",
        artist: "Artist Name",
        image: "https://placehold.co/300",
      },
      {
        name: "Song Name",
        artist: "Artist Name",
        image: "https://placehold.co/300",
      },
    ],
  },

  {
    name: "ALTERNATIVE",
    songs: [
      {
        name: "Song Name",
        artist: "Artist Name",
        image: "https://placehold.co/300",
      },
      {
        name: "Song Name",
        artist: "Artist Name",
        image: "https://placehold.co/300",
      },
      {
        name: "Song Name",
        artist: "Artist Name",
        image: "https://placehold.co/300",
      },
      {
        name: "Song Name",
        artist: "Artist Name",
        image: "https://placehold.co/300",
      },
      {
        name: "Song Name",
        artist: "Artist Name",
        image: "https://placehold.co/300",
      },
    ],
  },
];

function Genres() {
  return (
    <div className="min-h-screen bg-black text-[#faebd7] px-6 py-10">
      {/* Page Heading */}

      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-5xl font-semibold tracking-tight">
          GENRES
        </h1>

        <p className="mt-3 text-[#faebd7]/60">
          Explore music by genre.
        </p>

        {/* Genre Sections */}

        <div className="mt-16 space-y-16">
          {genres.map((genre) => (
            <section key={genre.name}>
              {/* Genre heading */}

              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-wide">
                  {genre.name}
                </h2>

                <button className="text-sm text-[#faebd7]/50 transition hover:text-[#ad46e4]">
                  View all →
                </button>
              </div>

              {/* Horizontal song row */}

              <div className="genre-scroll flex gap-6 overflow-x-auto pb-4">
                {genre.songs.map((song, index) => (
                  <div
                    key={index}
                    className="group w-40 shrink-0 cursor-pointer"
                  >
                    {/* Album Cover */}

                    <div className="aspect-square overflow-hidden rounded-2xl bg-[#1a1a1a]">
                      <img
                        src={song.image}
                        alt={song.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Song Info */}

                    <div className="mt-3">
                      <h3 className="truncate text-sm font-medium">
                        {song.name}
                      </h3>

                      <p className="mt-1 truncate text-xs text-[#faebd7]/55">
                        {song.artist}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Genres;