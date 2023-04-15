import {
  createAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "./reducer";
import { getNewsData } from "../../services/news.api";

const initialState = {
  newsArray: [],
  loading: false,
};

export const fetchAsyncNews = createAsyncThunk(
  "news/fetchAsyncNews",
  getNewsData
);

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAsyncNews.fulfilled, (state, action) => {
        state.newsArray = action.payload;
        state.loading = false;
      })
      .addCase(fetchAsyncNews.rejected, (state) => {
        state.loading = false;
        console.log("fetchAsyncNews rejected");
      })
      .addCase(clearAllNews, (state) => {
        state.newsArray = [];
        state.loading = true;
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

export const clearAllNews = createAction("news/ClearAll");

export default newsSlice.reducer;
