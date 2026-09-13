import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoggedin : false
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
        }
    },
})

export const {login , logout} = authSlice.actions;

export default authSlice.reducer;



