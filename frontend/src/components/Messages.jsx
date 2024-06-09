import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import io from 'socket.io-client';
import {
  addMessage, getMessage, getMessageCount2,
} from '../slices/messageSlice';
import { selectUser, getToken } from '../slices/authSlice';
import { getActiveChannelName, getActiveChannelId } from '../slices/channelSlice';

const socket = io('http://localhost:3000');

const handleSubmit = async (newMessage, getTokenFromState) => {
  console.log('Send', newMessage);
  try {
    const response = await axios.post('/api/v1/messages', newMessage, {
      headers: {
        Authorization: `Bearer ${getTokenFromState}`,
      },
    });
    console.log(response.data);
  } catch (e) {
    console.log(e);
  }
};

const Messages = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [networkStatus, setNetworkStatus] = useState('');
  const [pendingMessages, setPendingMessages] = useState(() => {
    const savedMessages = localStorage.getItem('pendingMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const states = useSelector((state) => state);
  console.log('state', states);
  const dispatch = useDispatch();
  // const getMessageCountFromState = useSelector(getMessageCount);
  const getMessageFromState = useSelector(getMessage);
  const getActiveChannelIdFromState = useSelector(getActiveChannelId);
  const getActiveChannelFromState = useSelector(getActiveChannelName);
  const getUserFromState = useSelector(selectUser);
  const getTokenFromState = useSelector(getToken);

  console.log('isOnline', isOnline);
  console.log('networkStatus', networkStatus);

  console.log('getUserFromState', getUserFromState);
  console.log('getActiveChannelFromState', getActiveChannelFromState);

  // Затем используем их внутри селектора
  const getMessageCountFromState2 = useSelector((state) => (
    getMessageCount2(state, getActiveChannelIdFromState)
  ));

  const newMessageFunc = (value, channelId, username) => ({ body: value, channelId, username });

  useEffect(() => {
    socket.on('newMessage', (message) => {
      console.log('Received new message:', message);
      dispatch(addMessage(message));
    });

    return () => {
      socket.off('newMessage');
    };
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setNetworkStatus('');

      // Отправляем все ожидающие сообщения
      const messages = JSON.parse(localStorage.getItem('pendingMessages')) || [];
      messages.forEach((message) => handleSubmit(message, getTokenFromState));
      localStorage.removeItem('pendingMessages');
    };

    const handleOffline = () => {
      setIsOnline(false);
      setNetworkStatus('Проблема с сетью, сообщения не отправляются');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('pendingMessages', JSON.stringify(pendingMessages));
  }, [pendingMessages]);

  const handleSubmitWithFallback = (newMessage, token) => {
    if (isOnline) {
      handleSubmit(newMessage, token);
    } else {
      setPendingMessages((prevMessages) => [...prevMessages, newMessage]);
      setNetworkStatus('Проблема с сетью, сообщение сохранено и будет отправлено при восстановлении сети');
    }
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        {networkStatus && (
          <div className="alert alert-warning" role="alert">
            {networkStatus}
          </div>
        )}
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {getActiveChannelFromState}
            </b>
          </p>
          <span className="text-muted">
            {getMessageCountFromState2}
            {' '}
            сообщений
          </span>
        </div>
        <div>
          <div className="flex-grow-1 d-flex flex-column">
            {getMessageFromState
              && getMessageFromState
                .filter((message) => message.channelId === getActiveChannelIdFromState)
                .map((message) => (
                  <p key={message.id} className="text-start">
                    <b>{message.username}</b>
                    :
                    {message.body}
                  </p>
                ))}
          </div>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5" />
        <div className="mt-auto px-5 py-3">
          <Formik
            initialValues={{ message: '' }}
            onSubmit={(values, { resetForm }) => {
              const newMessage = newMessageFunc(
                values.message,
                getActiveChannelIdFromState,
                getUserFromState,
              );
              handleSubmitWithFallback(newMessage, getTokenFromState);
              resetForm();
            }}
          >
            {({ handleChange, handleBlur, values }) => (
              <Form noValidate className="py-1 border rounded-2">
                <div className="input-group has-validation">
                  <Field
                    type="text"
                    name="message"
                    placeholder="Введите сообщение..."
                    autoComplete="off"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                  />
                  <Button type="submit" className="btn btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                      <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                    </svg>
                    <span className="visually-hidden">Отправить</span>
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Messages;
