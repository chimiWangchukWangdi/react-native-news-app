import { combineReducers } from "@reduxjs/toolkit";
import newsSlice from "./newsSlice/newsSlice";
import authSlice from "./auth-state/authSlice";

const rootReducer = combineReducers({
  news: newsSlice,
  auth: authSlice,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
