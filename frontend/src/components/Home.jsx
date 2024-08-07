/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import routes from '../routes/routes';
import 'react-toastify/dist/ReactToastify.css';

import {
  selectChannels,
  setChannels,
  getActiveChannel,
  getActiveChannelName,
  getShowModalWindow,
  getRenameShowModalWindow,
  getActiveChannelNameIdForChanging,
  getDeleteShowModalWindow,
  setShowNoticeForCreateChannel,
  getShowNoticeForCreateChannel,
  setShowNoticeForRenameChannel,
  getShowNoticeForRenameChannel,
  setShowNoticeForDeleteChannel,
  getShowNoticeForDeleteChannel,
} from '../slices/channelSlice';

import { getToken, logOutUser, selectIsAuthenticated } from '../slices/authSlice';

import Channels from './Channels';
import Messages from './Messages';
import ChannelModalWindow from './ChannelModal';
import RenameChannelModal from './RenameChannelModal';
import DeleteChannelModal from './DeleteChannel';

const HomePage = () => {
  // Selectors
  const getChannelsFromState = useSelector(selectChannels);
  const getActiveChannelNameFromState = useSelector(getActiveChannelName);
  const getactiveChannelFromState = useSelector(getActiveChannel);
  const getShowModalWindowFromState = useSelector(getShowModalWindow);
  const getShowRenameModalWindowFromState = useSelector(getRenameShowModalWindow);
  const getActiveChannelNameForChangingFromState = useSelector(getActiveChannelNameIdForChanging);
  console.log('getActiveChannelNameForChangingFromState', getActiveChannelNameForChangingFromState);
  const getDeleteModalWidowFromState = useSelector(getDeleteShowModalWindow);
  const getAuthorizationFromState = useSelector(selectIsAuthenticated);
  const getShowNoticeForCreateChannelFromState = useSelector(getShowNoticeForCreateChannel);
  const getShowNoticeForRenameChannelFromState = useSelector(getShowNoticeForRenameChannel);
  const getShowNoticeForDeleteChannelFromState = useSelector(getShowNoticeForDeleteChannel);

  console.log('Channels from state:', getChannelsFromState);

  console.log('ChannelsName from state:', getActiveChannelNameFromState);

  console.log('activeChannel', getactiveChannelFromState);

  const { t } = useTranslation();
  const token = useSelector(getToken);
  console.log('token in home page', token);

  const { nameForRename, idForRename } = useSelector(getActiveChannelNameIdForChanging);
  const { name, id } = useSelector(getActiveChannelNameIdForChanging);
  console.log('name in home', name, 'id in home', id);

  console.log('idForRename in Home', idForRename);

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

  const exitFunction = () => {
    dispatch(logOutUser());
    navigate('/login');
  };

  useEffect(() => {
    if (!getAuthorizationFromState) {
      navigate('/login');
    }
  });

  const notifyCreateChannel = () => {
    toast.success(t('warnings.channelCreated'), {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const notifyRenameChannel = () => {
    toast.success(t('warnings.channelRenamed'), {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const notifyDeleteChannel = () => {
    toast.success(t('warnings.channelDeleted'), {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    if (getShowNoticeForCreateChannelFromState) {
      notifyCreateChannel();
      dispatch(setShowNoticeForCreateChannel());
    }
  }, [getShowNoticeForCreateChannelFromState]);

  useEffect(() => {
    if (getShowNoticeForRenameChannelFromState) {
      notifyRenameChannel();
      dispatch(setShowNoticeForRenameChannel());
    }
  }, [getShowNoticeForRenameChannelFromState]);

  useEffect(() => {
    if (getShowNoticeForDeleteChannelFromState) {
      notifyDeleteChannel();
      dispatch(setShowNoticeForDeleteChannel());
    }
  }, [getShowNoticeForDeleteChannelFromState]);

  const channelClass = (channel, getCurrentActiveChannelIdFromState) => cn('w-100', 'rounded-0', 'text-start', 'btn', {
    'btn-secondary': parseInt(getCurrentActiveChannelIdFromState, 10) === parseInt(channel.id, 10),
  });

  getChannelsFromState.map((channel) => console.log('channel', channel));

  console.log('activeChannelFromState', getactiveChannelFromState);

  const handleLinkClick = (e) => {
    if (getAuthorizationFromState) {
      e.preventDefault(); // Prevent default link behavior
    }
  };

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/" onClick={handleLinkClick}>
                {t('chat.header')}
              </a>
              {getAuthorizationFromState && (
              <button type="button" className="btn btn-primary" onClick={() => exitFunction()}>
                {t('interfaces.logOut')}
              </button>
              )}

            </div>
          </nav>
          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">

              <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                <Channels channelClass={channelClass} />
              </div>
              <div className="col p-0 h-100">

                <Messages className="flex-grow-1 overflow-auto" />
              </div>
            </div>
          </div>
          {getShowModalWindowFromState && <ChannelModalWindow />}
          {getShowRenameModalWindowFromState && <RenameChannelModal />}
          {getDeleteModalWidowFromState && (
          <DeleteChannelModal channelId={id} />
          )}
        </div>

      </div>
      <div className="Toastify">
        <ToastContainer />
      </div>
    </div>
  );
};

export default HomePage;
