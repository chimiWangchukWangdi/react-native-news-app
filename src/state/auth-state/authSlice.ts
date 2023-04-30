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
    },
    setIsLoggedOut: (state) => {
      state.isLoggedIn = false;
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
