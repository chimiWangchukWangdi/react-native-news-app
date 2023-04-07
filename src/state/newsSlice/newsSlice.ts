import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "./reducer";
import axios from "axios";

const initialState = {
  newsArray: [],
  loading: false,
};

export const fetchAsyncNews = createAsyncThunk(
  "news/fetchAsyncNews",
  async (category: string) => {
    try {
      const country = "us";
      let apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=947cec9dbcf74747b963c311e02eecf0`;
      if (category) {
        apiUrl += `&category=${category}`;
      }
      const response = await axios.get(apiUrl);
      return response.data.articles;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncNews.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAsyncNews.fulfilled, (state, action) => {
        state.newsArray = action.payload;
        state.loading = false;
      })
      .addCase(fetchAsyncNews.rejected, (state, action) => {
        state.loading = false;
        console.log("fetchAsyncNews rejected");
      });
  },
});

export const selectNewsState = (state: RootState) => state.news;
export const getAllNews = createSelector(
  selectNewsState,
  (state) => state.newsArray
);

export const selectLoadingState = (state: RootState) => state.news;
export const getLoadingState = createSelector(
  selectLoadingState,
  (state) => state.loading
);

export default newsSlice.reducer;
