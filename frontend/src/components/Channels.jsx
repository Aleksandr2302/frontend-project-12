import { selectChannels, setActiveChannel, getActiveChannel, getActiveChannelName } from '../slices/channelSlice.js';
import cn from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Channels = (props) => {
  const dispatch = useDispatch();
  
  // Selectors 
  const getChannelsFromState = useSelector(selectChannels);
  const getActiveChannelNameFromState = useSelector(getActiveChannelName);
  const getactiveChannelFromState = useSelector(getActiveChannel);

  const handleSetActiveChannel = (id) => {
    dispatch(setActiveChannel(id));
  }
  
  const { channelClass } = props;

  return (
      <div >
        <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
          {getChannelsFromState.length > 0 ? (
            getChannelsFromState.map((channel) => (
              <li key={channel.id} className="nav-item w-100">
                <button
                  type="button"
                  className={cn(channelClass(channel, getactiveChannelFromState))}
                  onClick={() => handleSetActiveChannel(channel.id)}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </button>
              </li>
            ))
          ) : (
            <div>
              <p>Каналы отсутствуют или загружаются...</p>
            </div>
          )}
        </ul>
      </div>
  );
};

export default Channels;
