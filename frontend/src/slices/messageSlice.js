/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  messageCount: 0,
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.messages.push(action.payload); // Добавляем одно сообщение
      // eslint-disable-next-line no-param-reassign
      state.messageCount += 1; // Увеличиваем счетчик на 1
    },
    removeMessage(state, action) {
      const id = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.messages = state.messages.filter((message) => message.channelId !== id);
    },
  },
});

export const { addMessage, removeMessage } = messageSlice.actions;
export const getMessageCount = (state) => state.messages.messageCount;
export const getMessage = (state) => state.messages.messages;
export const getMessageCount2 = (state, activeChannelId) => {
  const messages = state.messages.messages
    .filter((message) => message.channelId === activeChannelId);
  return messages.length;
};

export default messageSlice.reducer;
