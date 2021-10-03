import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, { payload }) => {
      state.movies = payload;
    },
  },
});

// Exporting addMovies action creator
export const { addMovies } = movieSlice.actions;

// get values from store
export const getAllMovies = (state) => state.movies.movies;

// export reducer
export default movieSlice.reducer;
