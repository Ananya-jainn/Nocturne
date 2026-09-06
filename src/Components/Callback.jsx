import React from 'react'
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../spotify';

const Callback = () => {
  return <div>Loading...</div>
  const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');
console.log("code:", code);
}

export default Callback
