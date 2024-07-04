import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import { Modal, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import {
  getToken,
} from '../slices/authSlice';
import {
  renameChannel,
  setRenameShowWindow,
  getActiveChannelNameIdForChanging,
  setShowNoticeForRenameChannel,
} from '../slices/channelSlice';

const RenameChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const token = useSelector(getToken);
  const inputRef = useRef(null);

  const channels = useSelector((state) => state.channels.channels);

  const getActiveChannelNameIdForChangingFromState = useSelector(getActiveChannelNameIdForChanging);

  console.log('getActiveChannelNameIdForChangingFromState', getActiveChannelNameIdForChangingFromState);
  console.log('channels', channels);
  // getRenameShowModalWindow

  const uniqValidationChannel = (name) => {
    const uniqCnannel = channels.find((channel) => channel.name === name);
    console.log('uniqCnannel', uniqCnannel);
    return !uniqCnannel; // Возвращаем false, если имя занято, и true в противном случае
  };

  const ValidationSchema = Yup.object().shape({
    renameChannelName: Yup.string()
      .min(3, t('validation.min'))
      .max(20, t('validation.max'))
      .test('is-unique', t('validation.uniqFailed'), (value) => uniqValidationChannel(value)),
  });

  const handleCloseWindow = () => {
    dispatch(setRenameShowWindow());
  };

  const renameChannelFunction = async (newName, userToken, id) => {
    console.log('newName, token, id', newName, userToken, id);
    const editedChannel = { name: newName };

    try {
      const response = await axios.patch(`/api/v1/channels/${id}`, editedChannel, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.data) {
        console.log('response.data', response.data);
        dispatch(renameChannel({ id: response.data.id, newName: response.data.name }));
        handleCloseWindow(); // Закрытие модального окна после успешного добавления
        dispatch(setShowNoticeForRenameChannel());
      }

      console.log('response.data', response.data);
    } catch (error) {
      console.error('Error adding channel:', error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus(); // Устанавливаем фокус при монтировании компонента
        inputRef.current.select();
      }
    }, 100); // Задержка на 100 мс для гарантии, что модальное окно полностью отображено
  }, []);

  return (
    <Modal show onHide={handleCloseWindow} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ renameChannelName: getActiveChannelNameIdForChangingFromState.name }}
          validationSchema={ValidationSchema}
          onSubmit={(values) => {
            console.log('values', values);
            console.log('values.renameChannelName, token, getActiveChannelNameIdForChangingFromState.id', values.renameChannelName, token, getActiveChannelNameIdForChangingFromState.id);
            renameChannelFunction(
              values.renameChannelName,
              token,
              getActiveChannelNameIdForChangingFromState.id,
            );
          }}
        >
          {({ handleChange, handleBlur, values }) => (
            <Form noValidate>
              <div className="mb-3">
                <Field
                  type="text"
                  name="renameChannelName"
                  placeholder=""
                  autoComplete="off"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.renameChannelName}
                  innerRef={inputRef}
                />
                {console.log(values.renameChannelName)}
                <ErrorMessage name="renameChannelName" component="div" className="text-danger" />
              </div>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseWindow}>Отменить</Button>
                <Button variant="primary" type="submit">{t('messages.send')}</Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
export default RenameChannelModal;
