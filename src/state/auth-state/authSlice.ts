import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../reducer";

const initialState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state) => {
      state.isLoggedIn = true;
      console.log("this is setIsLoggedIn()", state.isLoggedIn)
    },
    setIsLoggedOut: (state) => {
      state.isLoggedIn = false;
      console.log("this is setIsLoggedOut()", state.isLoggedIn)
    },
  },
});

export const selectLoggedInState = (state: RootState) => state.auth;
export const getLoggedInState = createSelector(
  selectLoggedInState,
  (state) => state.isLoggedIn
);

export const { setIsLoggedIn, setIsLoggedOut } = authSlice.actions;

export default authSlice.reducer;
