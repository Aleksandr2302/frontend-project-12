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
  },
});

export const { addMessage } = messageSlice.actions;
export const getMessageCount = (state) => state.messages.messageCount;
export const getMessage = (state) => state.messages.messages;
export const getMessageCount2 = (state, activeChannelId) => {
  const messages = state.messages.messages
    .filter((message) => message.channelId === activeChannelId);
  return messages.length;
};

export default messageSlice.reducer;
