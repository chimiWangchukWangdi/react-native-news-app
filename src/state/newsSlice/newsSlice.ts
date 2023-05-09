import {
  createAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../reducer";
import { getNewsData } from "../../services/news.api";
import { debug } from "react-native-reanimated";

const initialState = {
  newsArray: [],
  loading: false,
  isDarkMode: false
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
      })
      .addCase(clearAllNews, (state) => {
        state.newsArray = [];
        state.loading = true;
      })
      .addCase(darkMode, (state) => {
        state.isDarkMode = !state.isDarkMode;
      })
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

export const getIsDarkMode = createSelector(
  selectLoadingState,
  (state) => state.isDarkMode
);

export const clearAllNews = createAction("news/ClearAll");
export const darkMode = createAction("news/darkMode");

export default newsSlice.reducer;
