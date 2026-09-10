import React from 'react';
import { useLocation } from "react-router-dom";

function Vibe() {
    const location = useLocation();
    const vibe = location.state?.vibe;
    console.log(vibe)

    const recommendations = [   

        {                       
            name: "Song Name 1",
            artist: "Artist Name 1",
            image: "https://placehold.co/200",
        },

        {                       
            name: "Song Name 2",
            artist: "Artist Name 2",
            image: "https://placehold.co/200",
        },
        {                       
            name: "Song Name 3",
            artist: "Artist Name 2",
            image: "https://placehold.co/200",
        },
        {                       
            name: "Song Name 4",
            artist: "Artist Name 2",
            image: "https://placehold.co/200",
        },
        {                       
            name: "Song Name 5",
            artist: "Artist Name 2",
            image: "https://placehold.co/200",
        },
        {                       
            name: "Song Name 6",
            artist: "Artist Name 2",
            image: "https://placehold.co/200",
        },

    ]; //hardcoded abhi ke liye
    return (
        
        <>
         <div className="min-h-screen bg-black text-[#faebd7] p-6">

            {/* Heading */}
            <div className="text-center">
                <h1 className="font-display text-5xl font-semibold tracking-tight">
                VIBE?
                </h1>

                <p className="mt-4 text-[#faebd7]/70">
                "{vibe}"
                </p>
            </div>
            {/* Recommendations container */}
            <div className="max-w-3xl mx-auto mt-12 border border-[#ad46e4c9] rounded-[30px] p-5 h-125 overflow-hidden">
                <div className="recommendations-scroll h-full overflow-y-auto pr-4">

            {/* Recommendations will go here */}
            {recommendations.map((song) => (
            <div
                key={song.name}
                className="flex items-center gap-5 border-b border-[#ad46e4c9]/40 py-5"
            >
                
                <div className="h-16 w-16 rounded-xl overflow-hidden">
                <img
                    src={song.image}
                    alt={song.name}
                    className="h-full w-full object-cover"
                />
                </div>

                <div>
                <h2 className="text-lg font-semibold">
                    {song.name}
                </h2>

                <p className="mt-1 text-sm text-[#faebd7]/60">
                    {song.artist}
                </p>
                </div>

            </div>
            ))}
               
                    
                </div>
            </div>

    </div>
        </>
    )
}

export default Vibe
