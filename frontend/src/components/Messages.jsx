import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import {
  addMessage, getMessage, getMessageCount2,
} from '../slices/messageSlice';
import { selectUser, getToken } from '../slices/authSlice';
import { getActiveChannelName, getActiveChannelId } from '../slices/channelSlice';
// import '../App.css';

const socket = io('http://localhost:3000');

const Messages = () => {
  const { t } = useTranslation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [networkStatus, setNetworkStatus] = useState('');
  const [pendingMessages, setPendingMessages] = useState(() => {
    const savedMessages = localStorage.getItem('pendingMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const dispatch = useDispatch();
  const getMessageFromState = useSelector(getMessage);
  const getActiveChannelIdFromState = useSelector(getActiveChannelId);
  const getActiveChannelFromState = useSelector(getActiveChannelName);
  const getUserFromState = useSelector(selectUser);
  const getTokenFromState = useSelector(getToken);

  const messagesBoxRef = useRef(null);

  const getMessageCountFromState2 = useSelector((state) => (
    getMessageCount2(state, getActiveChannelIdFromState)
  ));

  const newMessageFunc = (value, channelId, username) => ({ body: value, channelId, username });

  const handleSubmit = async (newMessage, token) => {
    console.log('Send', newMessage);
    try {
      const response = await axios.post('/api/v1/messages', newMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    socket.on('newMessage', (message) => {
      console.log('Received new message:', message);
      dispatch(addMessage(message));
    });

    return () => {
      socket.off('newMessage');
    };
  }, [dispatch]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setNetworkStatus('');

      const messages = JSON.parse(localStorage.getItem('pendingMessages')) || [];
      messages.forEach((message) => handleSubmit(message, getTokenFromState));
      localStorage.removeItem('pendingMessages');
    };

    const handleOffline = () => {
      setIsOnline(false);
      setNetworkStatus(t('warnings.networkError'));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [getTokenFromState]);

  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  }, [getMessageFromState]);

  useEffect(() => {
    localStorage.setItem('pendingMessages', JSON.stringify(pendingMessages));
  }, [pendingMessages]);

  const handleSubmitWithFallback = (newMessage, token) => {
    if (isOnline) {
      handleSubmit(newMessage, token);
    } else {
      setPendingMessages((prevMessages) => [...prevMessages, newMessage]);
      setNetworkStatus(t('warnings.networkWarning'));
    }
  };

  return (
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
          {t('messagesCounter', { count: getMessageCountFromState2 })}
        </span>
      </div>
      <div id="messages-box" ref={messagesBoxRef} className="chat-messages overflow-auto px-5 my-1">
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
                  placeholder={t('messages.inputPlaceholder')}
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
                  <span className="visually-hidden">{t('messages.send')}</span>
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Messages;
