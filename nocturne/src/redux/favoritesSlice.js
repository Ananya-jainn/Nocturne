import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    artists:[],
    songs:[]
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addArtist: (state, action) => {
      state.artists.push(action.payload);
    },

    removeArtist: (state, action) => {
      state.artists = state.artists.filter(
        (artist) => artist.id !== action.payload.id
      );
    },

    addSong: (state, action) => {
      state.songs.push(action.payload);
    },

    removeSong: (state, action) => {
      state.songs = state.songs.filter(
        (song) => song.id !== action.payload.id
      );
    },
    setFavorites: (state, action) => {
      state.artists = action.payload.artists;
      state.songs = action.payload.songs;
    },
  },
});


export const {
  addArtist,
  removeArtist,
  addSong,
  removeSong,
  setFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;