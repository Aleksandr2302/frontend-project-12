import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.isAuthenticated = true;
    },
    setToken(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.token = action.payload;
    },
    setUser(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload;
    },
    setAuthorization(state) {
      // eslint-disable-next-line no-param-reassign
      state.isAuthenticated = true;
    },
    logOutUser: () => initialState,
  },
});

export const {
  loginUser, logoutUser, setToken, setUser, setAuthorization, logOutUser, addEachUserName,
} = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const getToken = (state) => state.auth.token;

export default authSlice.reducer;
