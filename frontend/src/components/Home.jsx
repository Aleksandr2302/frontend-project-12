/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import cn from 'classnames';
import routes from '../routes/routes';
import {
  selectChannels, setChannels, setActiveChannel, getActiveChannel, getActiveChannelName,
} from '../slices/channelSlice';
import {
  selectUser, selectIsAuthenticated, setToken, getToken,
} from '../slices/authSlice';
import { addMessage, getMessageCount } from '../slices/messageSlice';
import Channels from './Channels';
import Messages from './Messages';

const HomePage = () => {
  const token = useSelector(getToken);
  console.log('token in home page', token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // getChanels
  const getChanels = async (userToken) => {
    try {
      const response = await axios.get(routes.getChannels(), {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const channels = response.data;
      console.log('channels in getChannels func', channels);
      dispatch(setChannels(channels));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getChanels(token);
  }, []);

  // Selectors
  const getChannelsFromState = useSelector(selectChannels);
  const getActiveChannelNameFromState = useSelector(getActiveChannelName);
  const getactiveChannelFromState = useSelector(getActiveChannel);

  console.log('Channels from state:', getChannelsFromState);

  console.log('ChannelsName from state:', getActiveChannelNameFromState);

  console.log('activeChannel', getactiveChannelFromState);

  const channelClass = (channel, getCurrentActiveChannelIdFromState) => cn('w-100', 'rounded-0', 'text-start', 'btn', {
    'btn-secondary': parseInt(getCurrentActiveChannelIdFromState, 10) === parseInt(channel.id, 10),
  });

  const handleSetActiveChannel = (id) => {
    dispatch(setActiveChannel(id));
  };

  getChannelsFromState.map((channel) => console.log('channel', channel));

  console.log('activeChannelFromState', getactiveChannelFromState);

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">
                Hexlet Chat
              </a>
              <button type="button" className="btn btn-primary">
                Выйти
              </button>
            </div>
          </nav>
          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
              <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                  <b>Каналы</b>
                  <button type="button" className="p-0 text-primary btn btn-group-vertical">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                    <span className="visually-hidden">+</span>
                  </button>
                </div>
                <Channels channelClass={channelClass} />
              </div>
              <Messages />
            </div>
          </div>
        </div>
      </div>
      <div className="Toastify" />
    </div>
  );
};

export default HomePage;
