import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    // другие слайсы (reducers)...
  },
  // middleware и другие настройки...
});