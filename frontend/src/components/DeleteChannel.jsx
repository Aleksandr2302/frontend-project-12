import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  setActiveChannel,
  setDeleteShowWindow,
  deleteChannel,
  setShowNoticeForDeleteChannel,
} from '../slices/channelSlice';
import { getToken } from '../slices/authSlice';
import { removeMessage } from '../slices/messageSlice';

const DeleteChannelModal = (channelId) => {
  const { t } = useTranslation();
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
        dispatch(setShowNoticeForDeleteChannel());
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
        <Modal.Title>{t('channels.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('info.areYouSure')}</p>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseWindow}>Отменить</Button>
          <Button variant="danger" type="submit" onClick={() => deleteChannelFunction(channelId, token)}>{t('channels.delete')}</Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};
export default DeleteChannelModal;
