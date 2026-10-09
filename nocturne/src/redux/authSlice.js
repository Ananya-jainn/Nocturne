import { createSlice } from "@reduxjs/toolkit";


const savedUser = localStorage.getItem("user");

const initialState = {
    user: savedUser?JSON.parse(savedUser) : null,
    isLoggedin : savedUser? true:false ,
}



const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login: (state , action) =>{
            state.user= action.payload;
            state.isLoggedin = true;
        },
        logout: (state) =>{
            state.user = null;
            state.isLoggedin = false;
            localStorage.removeItem("user");
        },
    },
})

export const {login , logout} = authSlice.actions;

export default authSlice.reducer;



