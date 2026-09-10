import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";


function Artist() {
    const {id} = useParams();
    const [artists , setArtists] = useState(null);
    const [bio , setBio] = useState("");
    const [tracks , setTracks] = useState([]);
    const [genres, setGenres] = useState([]);
    useEffect(()=>{
        const getArtist = async () =>{
            const token = localStorage.getItem('access_token');

            const response = await fetch(
                `https://api.spotify.com/v1/artists/${id}`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            const data = await response.json();

            console.log(data);

            setArtists(data);

            

            const lastfmKey = import.meta.env.VITE_LASTFM_API_KEY;
            const bioResponse = await fetch(
                 `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(data.name)}&api_key=${lastfmKey}&format=json`

            );
            const bioData = await bioResponse.json();

            console.log(bioData);
            

            setBio(bioData.artist.bio.summary);
            const cleanBio = bioData.artist.bio.summary
            .split("<a")[0]
            .trim();

            setBio(cleanBio);

            const tracksResponse = await fetch(
                 `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(data.name)}&api_key=${lastfmKey}&format=json&limit=3`
            );
            const tracksData = await tracksResponse.json();
            console.log(tracksData);
            
            setTracks(tracksData.toptracks.track);
            setGenres(bioData.artist.tags.tag);

            
        }

        getArtist();
       
      
    },[id]);
    console.log(artists);
   
    

    if (!artists) {
    return <div>Loading...</div>;
    }

    return (
        <>
       <div className="min-h-screen bg-black text-[#faebd7] mt-3 mb-10 ">

        <div className="max-w-4xl mx-auto border border-none rounded-[35px] p-6 md:p-8 bg-linear-to-br from-[#2a0441e8] via-[#3c01016d] to-[#110319]">

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-12">

            {/* LEFT SIDE */}
            <div>

                {/* ARTIST IMAGE */}
                <div className=" border-none rounded-[30px] 
                overflow-hidden  shadow-[0_0_20px_rgba(30,6,11,0.85)]"
                >
                <img src={artists.images?.[0]?.url}
                 alt={artists.name}
                 className="..." />
                
                </div>

                {/* POPULAR TRACKS */}
                <h2 className="mt-5 text-2xl font-display">
                Popular Tracks
                </h2>

               {/* TRACKS */}
                <div className="mt-2 space-y-4 font-display">

                {tracks.map((track , index) => (
                    <div 
                    key={track.name}
                    className=" flex items-center gap-5 rounded-2xl p-4 shadow-[0_0_20px_rgba(30,6,11,0.85)]
                   bg-[#000000c9] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0f0c11c9]"
                    >
                        <span>0{index + 1}</span>
                        <p>{track.name}</p>
                    </div>
                ))}

                </div>

            </div>


            {/* RIGHT SIDE */}
            <div className="
            rounded-[35px] p-5 shadow-[0_0_20px_rgba(30,6,11,0.85)] bg-[#000000c9]">

                <h1 className="text-4xl font-display">
                {artists.name}
                </h1>

               <p className=' mt-2 text-sm tracking-wide text-[#b9a8c9]'>
               {genres.map((genre) => genre.name).join(" • ")}
                </p>

                <div className="mt-16">
               <h2 className="mt-13text-sm font-semibold tracking-[0.25em] text-[#a88ab8]">
                ABOUT THE ARTIST
                </h2>

                <p className="mt-3 text-base leading-8 text-[#faebd7]/85">
                {bio}
                </p>
                </div>

      </div>

    </div>

  </div>

</div>
        </>
    )
}

export default Artist

