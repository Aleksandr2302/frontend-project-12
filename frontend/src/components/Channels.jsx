/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import cn from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectChannels, setActiveChannel, getActiveChannel, getActiveChannelId, setShowModalWindow, setRenameShowWindow, setChannelInfoForRename, setDeleteShowWindow
} from '../slices/channelSlice';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import '../App.css';

const Channels = (props) => {
  const dispatch = useDispatch();

  // Selectors
  const getActiveChannelIdFromState = useSelector(getActiveChannelId);
  const getChannelsFromState = useSelector(selectChannels);
  const getActiveChannelFromState = useSelector(getActiveChannel);

  const truncateChannelName = (name, removable) => {
    const maxLength = 5;
    if (name.length >= maxLength && removable) {
      return `${name.slice(0, 2)}...`;
    }
    return name;
  };

  const handleRename = (channelName, channelId) => {
    console.log('Renaming channel:', channelName, channelId);
    dispatch(setChannelInfoForRename({ channelName, channelId }));
    dispatch(setRenameShowWindow());
  };

  const handleDelete = (channelName, channelId) => {
    console.log('Deleting channel:', channelName, channelId);
    dispatch(setChannelInfoForRename({ channelName, channelId }));
    dispatch(setDeleteShowWindow());
  };

  const handleSetActiveChannel = (id) => {
    dispatch(setActiveChannel(id));
  };

  const addChannel = () => {
    console.log('Add Button');
    dispatch(setShowModalWindow());
  };

  const { channelClass } = props;

  return (
    <>
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>Каналы</b>
          <button
            type="button"
            className="p-0 text-primary btn btn-group-vertical"
            onClick={addChannel}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
            <span className="visually-hidden">+</span>
          </button>
        </div>

        <div>
          <ul
            id="channels-box"
            className="nav flex-column nav-pills overflow-auto nav-fill px-2 mb-3 h-100 d-block"
          >
            {getChannelsFromState.length > 0 ? (
              getChannelsFromState.map((channel) => (
                <li key={channel.id} className="nav-item w-100 d-flex align-items-center">
                  <button
                    type="button"
                    className={channelClass(channel, getActiveChannelFromState)}
                    onClick={() => handleSetActiveChannel(channel.id)}
                  >
                    <span className="me-1">#</span>
                    {truncateChannelName(channel.name, channel.removable)}
                  </button>
                  {channel.removable && (
                    <DropdownButton
                      variant={channel.id === getActiveChannelIdFromState ? 'secondary rounded-0' : 'light rounded-0'}
                      title=""
                    >
                      <Dropdown.Item eventKey="1" onClick={() => handleRename(channel.name, channel.id)}>
                        Переименовать
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="2" onClick={() => handleDelete(channel.name, channel.id)}>
                        Удалить
                      </Dropdown.Item>
                    </DropdownButton>
                  )}
                </li>
              ))
            ) : (
              <div>
                <p>Каналы отсутствуют или загружаются...</p>
              </div>
            )}
          </ul>
        </div>
      
    </>
  );
};

export default Channels;
