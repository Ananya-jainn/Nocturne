import React from 'react'
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getToken } from '../spotify';

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get('code');
        console.log("code:", code);

        const handleCallback = async()=>{
            if (code) {
                await getToken(code);
                navigate("/")
            }

        }
        handleCallback();
    },[]);


  return <div>Loading...</div>
  
}

export default Callback
