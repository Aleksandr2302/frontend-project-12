/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  activeChannel: {
    id: 1,
  },
  showModalWindow: false,
  showRenameChannelModalWindow: false,
  showDeleteChannelModalWindow: false,
  activeChannelNameForChanging: {
    name: '',
    id: null,
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
    setShowModalWindow(state) {
      state.showModalWindow = !state.showModalWindow;
    },
    addChannel(state, action) {
      state.channels = [...state.channels, action.payload];
    },
    setRenameShowWindow(state) {
      state.showRenameChannelModalWindow = !state.showRenameChannelModalWindow;
    },
    setDeleteShowWindow(state) {
      state.showDeleteChannelModalWindow = !state.showDeleteChannelModalWindow;
    },
    renameChannel(state, action) {
      console.log('Payload in renameChannel:', action.payload);
      const { id, newName } = action.payload;
      const channelToUpdate = state.channels.find((channel) => channel.id === id);
      console.log('channelToUpdate', channelToUpdate);
      if (channelToUpdate) {
        channelToUpdate.name = newName;
      }
    },
    setChannelInfoForRename(state, action) {
      const { channelName, channelId } = action.payload;
      state.activeChannelNameForChanging.name = channelName;
      state.activeChannelNameForChanging.id = channelId;
    },
    deleteChannel(state, action) {
      const id = action.payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
    },
  },
});

export const {
  setChannels,
  setActiveChannel,
  setShowModalWindow,
  addChannel,
  setRenameShowWindow,
  setChannelInfoForRename,
  renameChannel,
  deleteChannel,
  setDeleteShowWindow,
} = channelSlice.actions;
export const selectChannels = (state) => state.channels.channels;
export const getActiveChannel = (state) => state.channels.activeChannel.id;
export const getShowModalWindow = (state) => state.channels.showModalWindow;
export const getRenameShowModalWindow = (state) => state.channels.showRenameChannelModalWindow;
// eslint-disable-next-line max-len
export const getActiveChannelNameIdForChanging = (state) => state.channels.activeChannelNameForChanging;
export const getDeleteShowModalWindow = (state) => state.channels.showDeleteChannelModalWindow;

export const getActiveChannelName = (state) => {
  const activeChannelId = parseInt(state.channels.activeChannel.id, 10);
  const activeChannel = state.channels.channels.find((
    (channel) => parseInt(channel.id, 10) === activeChannelId));
  console.log('activeChannelId in Redux', activeChannelId);

  console.log('activeChannelName in Redux', activeChannel);

  return activeChannel ? activeChannel.name : null;
};

export const getActiveChannelId = (state) => {
  const activeChannelId = state.channels.activeChannel.id;
  const activeChannel = state.channels.channels.find((channel) => channel.id === activeChannelId);
  return activeChannel ? activeChannel.id : null;
};

// export const uniqChannelName = (name) => {
//   const allNotUniqChannelName = state.channels.channels.find((channel) => channel.name === name);
//   return !allNotUniqChannelName;
// };
console.log('getActiveChannelId in Redux', getActiveChannelId);
console.log('Тип данных getActiveChannelId:', typeof getActiveChannelId);

export default channelSlice.reducer;
