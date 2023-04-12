import {
  createAction,
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
      let apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=947cec9dbcf74747b963c311e02eecf0321`;
      if (category) {
        apiUrl += `&category=${category}`;
      }
      const response = await axios.get(apiUrl);
      return response.data.articles;
    } catch (error) {
      console.log('this is fetchAsyncNews', error);
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
      }).addCase(clearAllNews, state => {
        state.newsArray = [];
        state.loading = true;
      });
  },
});

export const selectNewsState = (state: RootState) =>state.news;
export const getAllNews = createSelector(
  selectNewsState,
  (state) => state.newsArray
);

export const selectLoadingState = (state: RootState) => state.news;
export const getLoadingState = createSelector(
  selectLoadingState,
  (state) => state.loading
);

export const clearAllNews = createAction('news/ClearAll');

export default newsSlice.reducer;
