import React from 'react'
import { useState } from 'react';
import { authorizeSpotify } from '../spotify';
import { useNavigate } from 'react-router-dom';

function Discover() {
    const [searchArtist, setSearchArtist] = useState("");
    const [artists, setArtists] = useState([]);
    const navigate = useNavigate()

    const handleSearchArtist = async() =>{
    const token = localStorage.getItem('access_token')

    if (token) {

      const url = 'https://api.spotify.com/v1/search'
      const params = new URLSearchParams({
        q : searchArtist ,
        type : "artist"
      })
     const finalUrl = url + '?' + params.toString()
    
    const response = await (fetch(finalUrl,{
      headers:{
        Authorization :`Bearer ${token}`
      }
    }));
    const data = await response.json();
    console.log(data);
    console.log(data.artists.items)
    setArtists(data.artists.items)



    } else{
      authorizeSpotify()
    }
  }


    return (
        <>
        <div className="w=full max-w-3xl mx-auto px-6 mt-16">

            <div
              className="
                flex
                items-center
                gap-3
                bg-transparent
                border
                border-white/10
                rounded-full
                px-5
                py-3
                focus-within:border-[#ad46e4c9]
                transition
                
              "
            >

              <input
                value={searchArtist}
                onChange={(e) => setSearchArtist(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                    handleSearchArtist();
                    }
                }}
                type="text"
                placeholder="Search an artist..."
                className="
                  flex-1
                  bg-transparent
                  outline-none
                  text-sm
                  text-[#faebd7]
                  placeholder:text-gray-600
                "
              />

            </div>
            <div className="mt-8 space-y-3">
            {artists.map((artist) => (
                <div
                key={artist.id}
                onClick={() => navigate(`/artist/${artist.id}`)}
                className="
                    flex
                    items-center
                    gap-4
                    p-4
                    border
                    border-white/10
                    rounded-2xl
                    hover:border-[#ad46e4c9]
                    hover:bg-white/5
                    transition
                    cursor-pointer
                "
                >
                    <img
                    src={artist.images?.[0]?.url}
                    alt={artist.name}
                    className="w-14 h-14 rounded-full object-cover"
                    />

                    <div className="text-left">
                        <h3 className="text-[#faebd7]">
                        {artist.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                        Artist
                        </p>
                    </div>

                    <span className="ml-auto text-[#ad46e4c9]">
                        &#x2192;
                    </span>
                </div>
            ))}
            </div>

        </div>
        
        </>
    )
}

export default Discover
