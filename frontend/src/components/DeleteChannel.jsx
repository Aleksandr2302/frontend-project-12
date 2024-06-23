import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import {
  setActiveChannel,
  setDeleteShowWindow,
  deleteChannel,
} from '../slices/channelSlice';
import { getToken } from '../slices/authSlice';
import { removeMessage } from '../slices/messageSlice';

const DeleteChannelModal = (channelId) => {
  const dispatch = useDispatch();
  // const {nameForRename, idForRename} = useSelector(getActiveChannelNameIdForChanging);
  const token = useSelector(getToken);

  const handleCloseWindow = () => {
    dispatch(setDeleteShowWindow());
  };

  const deleteChannelFunction = async (chlId, tkn) => {
    console.log('channelId in deleteChannelFunction', chlId);
    try {
      const channelIdValue = typeof chlId === 'object' ? chlId.channelId : chlId;
      const response = await axios.delete(`/api/v1/channels/${channelIdValue}`, {
        headers: {
          Authorization: `Bearer ${tkn}`,
        },
      });

      if (response.data) {
        console.log('response.data', response.data);
        console.log('Dispatching deleteChannel with id:', channelIdValue);
        console.log('typeof channelIdValue', typeof channelIdValue);
        dispatch(deleteChannel(channelIdValue));

        console.log('Dispatching removeMessage with id:', channelIdValue);
        dispatch(removeMessage(channelIdValue));
        console.log('Calling handleCloseWindow');
        handleCloseWindow();
        dispatch(setActiveChannel(1));
      }
    } catch (error) {
      console.error('Error adding channel:', error);
    }
  };

  return (
    <Modal show onHide={handleCloseWindow} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Уверены?</p>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseWindow}>Отменить</Button>
          <Button variant="danger" type="submit" onClick={() => deleteChannelFunction(channelId, token)}>Удалить</Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};
export default DeleteChannelModal;
