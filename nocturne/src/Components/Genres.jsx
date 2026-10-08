import { useState, useEffect } from "react";
import { addSong, removeSong } from "../redux/favoritesSlice";
import { useDispatch, useSelector } from "react-redux";

function Genres() {
  const [genres, setGenres] = useState({});
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const favoriteSongs = useSelector((state) => state.favorites.songs);

  useEffect(() => {
    const getGenres = async () => {
      const response = await fetch("http://localhost:3000/genre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          genres: ["pop", "indie", "r&b", "alternative"],
        }),
      });

      if (!response.ok) {
        console.log("Genre request failed:", response.status);
        setLoading(false);
        return;
      }

      const data = await response.json();

      console.log("Genre data:", data);

      setGenres(data);
      setLoading(false);
    };

    getGenres();
  }, []);

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

        {/* Loading / Genre Sections */}
        {loading ? (
          <p className="mt-16 text-[#faebd7]/50">
            Finding your music...
          </p>
        ) : (
          <div className="mt-16 space-y-16">

            {Object.entries(genres).map(([genreName, songs]) => (
              <section key={genreName}>

                {/* Genre Heading */}
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-wide">
                    {genreName.toUpperCase()}
                  </h2>
                </div>

                {/* Songs */}
                <div className="genre-scroll flex gap-6 overflow-x-auto pb-4">

                  {songs.map((song) => {

                    const isFavorite = favoriteSongs.some(
                      (favorite) => favorite.id === song.id
                    );

                    return (
                      <div
                        key={song.id}
                        className="group w-40 shrink-0 cursor-pointer"
                      >

                        {/* Album Cover */}
                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#1a1a1a]">

                          <img
                            src={song.album?.images?.[0]?.url}
                            alt={song.name}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />

                          {/* Heart */}
                          <button
                            onClick={async (e) => {
                              e.stopPropagation();

                              if (isFavorite) {
                                dispatch(removeSong(song));

                                await fetch(
                                  "http://localhost:3000/favorites/song",
                                  {
                                    method: "DELETE",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      userId: user.id,
                                      songId: song.id,
                                    }),
                                  }
                                );
                              } else {
                                dispatch(addSong(song));

                                await fetch(
                                  "http://localhost:3000/favorites/song",
                                  {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      userId: user.id,
                                      song,
                                    }),
                                  }
                                );
                              }
                            }}
                            className="absolute right-3 top-3 z-10 text-2xl text-white drop-shadow-lg transition hover:scale-110"
                          >
                            {isFavorite ? "♥" : "♡"}
                          </button>

                        </div>

                        {/* Song Info */}
                        <div className="mt-3">

                          <h3 className="truncate text-sm font-medium">
                            {song.name}
                          </h3>

                          <p className="mt-1 truncate text-xs text-[#faebd7]/55">
                            {song.artists
                              ?.map((artist) => artist.name)
                              .join(", ")}
                          </p>

                        </div>

                      </div>
                    );
                  })}

                </div>

              </section>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Genres;