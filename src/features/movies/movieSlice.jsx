import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MovieApi from "../../common/apis/MovieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

// Movies
export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    // const movieText = "Harry";
    const response = await MovieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=movie`
    );
    return response.data;
  }
);

// Shows
export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    // const seriesText = "Friends";
    const response = await MovieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=series`
    );
    return response.data;
  }
);

// Fetching movie or show detail
export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await MovieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    },
  },

  extraReducers: {
    // Movies
    [fetchAsyncMovies.pending]: () => {
      console.log("Penidng...");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully !");
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected !");
    },
    // Shows
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully !");
      return { ...state, shows: payload };
    },
    // Movie or show detail
    [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully !");
      return { ...state, selectedMovieOrShow: payload };
    },
  },
});

// Exporting addMovies action creator
export const { removeSelectedMovieOrShow } = movieSlice.actions;

// get values from store
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) =>
  state.movies.selectedMovieOrShow;

// export reducer
export default movieSlice.reducer;
