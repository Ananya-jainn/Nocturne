import { useState  , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "../redux/favoritesSlice";


function Favorites() {
  const [activeTab, setActiveTab] = useState("songs");

  const dispatch = useDispatch();

  const user = useSelector(
    (state) => state.auth.user
  )

  const favoriteSongs = useSelector(
  (state) => state.favorites.songs
);

const favoriteArtists = useSelector(
  (state) => state.favorites.artists
);


  useEffect(() => {
    const getFavorites = async () => {
      const response = await fetch(
        `http://localhost:3000/favorites/${user.id}`
      );

      const data = await response.json();

      console.log("Favorites from MongoDB:", data);

      dispatch(setFavorites(data));
    };

    if (user) {
      getFavorites();
    }
  }, [user, dispatch]);
  return (
    <div className="min-h-screen bg-black px-6 py-10 text-[#faebd7]">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}

        <div className="mb-12">
          <h1 className="font-display text-5xl font-semibold tracking-tight">
            FAVORITES
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
            {favoriteSongs.map((song) => (
              
              <div
                key={song.id}
                className="group flex items-center justify-between rounded-2xl border border-[#faebd7]/10 p-4 transition hover:border-[#ad46e4]/60"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={song.album?.images?.[0]?.url}
                    alt={song.name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />

                  <div>
                    <h2 className="font-medium">{song.name}</h2>

                    <p className="mt-1 text-sm text-[#faebd7]/55">
                      {song.artists?.map((artist) => artist.name).join(", ")}
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
            {favoriteArtists.map((artist) => (
              <div
                key={artist.id}
                className="group cursor-pointer"
              >
                <div className="aspect-square overflow-hidden rounded-2xl bg-[#1a1a1a]">
                  <img
                    src={artist.images?.[0]?.url}
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

export default Favorites;
