import React from 'react';
import { useLocation } from "react-router-dom";
import { useEffect , useState} from 'react';
import { searchTracks } from '../spotify';

function Vibe() {

    const location = useLocation();
    const vibe = location.state?.vibe;
    console.log(vibe)
        const [recommendation , setRecommendation] = useState([]);

    useEffect(() => {
         const sendVibe = async () => {
            const response = await fetch("http://localhost:3000/vibe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                vibe: vibe,
            }),
            });

                const data = await response.json();
                console.log(data);
                setRecommendation(data.tracks);
                
        };
        sendVibe();
    }, [vibe]);
   
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
                    {recommendation.map((song) => (
                    <div
                        key={song.name}
                        className="flex items-center justify-between gap-5 border-b border-[#ad46e4c9]/40 py-5"
                    >
                        
                        <div className="h-16 w-16 rounded-xl overflow-hidden">
                        <img
                            src={song.album.images[0]?.url}
                            alt={song.id}
                            className="h-full w-full object-cover"
                        />
                        </div>

                        <div>
                        <h2 className="text-lg font-semibold">
                            {song.name}
                        </h2>

                        <p className="mt-1 text-sm text-[#faebd7]/60">
                            {song.artists.map((artist) => artist.name).join(", ")}
                        </p>
                        </div>
                        <button
                        className="text-2xl text-[#faebd7]/60 transition hover:scale-110 hover:text-[#ad46e4]"
                        >
                         &#9829; 
                        </button>
                    
                    </div>
                     
                    ))}
                 
                </div>
            </div>

    </div>
        </>
    )
}

export default Vibe
