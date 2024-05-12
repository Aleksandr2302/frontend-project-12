import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice ({
  name: 'auth',
  initialState,
  reducers: {
    loginUser(state, action){
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser(state, action){
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const {loginUser, logoutUser} = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;