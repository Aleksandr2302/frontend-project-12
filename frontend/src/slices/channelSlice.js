import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  activeChannel: {
    id: 1,
  },
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.channels = action.payload;
    },
    setActiveChannel(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.activeChannel = { id: action.payload };
    },
  },
});

export const { setChannels, setActiveChannel } = channelSlice.actions;
export const selectChannels = (state) => state.channels.channels;
export const getActiveChannel = (state) => state.channels.activeChannel.id;
export const getActiveChannelName = (state) => {
  const activeChannelId = state.channels.activeChannel.id;
  const activeChannel = state.channels.channels.find((channel) => channel.id === activeChannelId);

  // console.log('activeChannelName in Redux', activeChannel);

  return activeChannel ? activeChannel.name : null;
};

export const getActiveChannelId = (state) => {
  const activeChannelId = state.channels.activeChannel.id;
  const activeChannel = state.channels.channels.find((channel) => channel.id === activeChannelId);
  return activeChannel ? activeChannel.id : null;
};

export default channelSlice.reducer;
