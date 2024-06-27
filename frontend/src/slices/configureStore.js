import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import channelReducer from './channelSlice';
import messageReducer from './messageSlice';
import signUpReducer from './signUp';

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelReducer,
    messages: messageReducer,
    signUp: signUpReducer,
  },
  // middleware и другие настройки...
});
