import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import { Modal, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import {
  getToken,
} from '../slices/authSlice';
import {
   renameChannel, setRenameShowWindow, getActiveChannelNameIdForChanging,
} from '../slices/channelSlice';

export const RenameChannelModal = (channelName, id) => {
  const dispatch = useDispatch();

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
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .test('is-unique', 'Это имя канала уже занято', (value) => uniqValidationChannel(value)),
  });

  const handleCloseWindow = () => {
    dispatch(setRenameShowWindow());
  };

  const renameChannelFunction = async (newName, token, id) => {
    console.log('newName, token, id', newName, token, id);
    const editedChannel = { name: newName };

    try {
      const response = await axios.patch(`/api/v1/channels/${id}`, editedChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        console.log('response.data', response.data);
        dispatch(renameChannel({ id: response.data.id, newName: response.data.name })); // Вызов диспетчера для добавления канала в Redux

        handleCloseWindow(); // Закрытие модального окна после успешного добавления
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
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ renameChannelName: getActiveChannelNameIdForChangingFromState.name }}
          validationSchema={ValidationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log('values', values);
            console.log('values.renameChannelName, token, getActiveChannelNameIdForChangingFromState.id', values.renameChannelName, token, getActiveChannelNameIdForChangingFromState.id);
            renameChannelFunction(values.renameChannelName, token, getActiveChannelNameIdForChangingFromState.id);
          // resetForm();
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
                <Button variant="primary" type="submit">Отправить</Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
