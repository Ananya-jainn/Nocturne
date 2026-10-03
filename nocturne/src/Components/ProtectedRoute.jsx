import React from "react";
import { Navigate , Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


function ProtectedRoute(){

    const isLoggedin = useSelector((state) => state.auth.isLoggedin);
    const location = useLocation();
    

    if(! isLoggedin){
        return (<Navigate to="/login" state={{from: location}}/>)
    }
    return( <Outlet/>)
}

export default ProtectedRoute;