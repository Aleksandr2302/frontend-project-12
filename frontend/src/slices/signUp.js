import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showSignUpPage: false,
};

const signUpSlice = createSlice({
  name: 'signUpSlice',
  initialState,
  reducers: {
    setShowSignUpPage(state) {
      // eslint-disable-next-line no-param-reassign
      state.showSignUpPage = !state.showSignUpPage;
    },
  },
});

export const {
  setShowSignUpPage,
} = signUpSlice.actions;

export default signUpSlice.reducer;
