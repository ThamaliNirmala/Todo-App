import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  registeredUsers: []
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    register: (state, action) => {
      state.isAuthenticated = false;
      state.registeredUsers = [...state.registeredUsers, action.payload];
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
