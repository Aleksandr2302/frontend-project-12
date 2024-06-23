import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import { Modal, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { getToken } from '../slices/authSlice';
import {
  setActiveChannel,
  setShowModalWindow,
  addChannel,
} from '../slices/channelSlice';

const ChannelModalWindow = () => {
  const channels = useSelector((state) => state.channels.channels);

  const uniqValidationChannel = (name) => {
    const uniqCnannel = channels.find((channel) => channel.name === name);
    console.log('uniqCnannel', uniqCnannel);
    return !uniqCnannel; // Возвращаем false, если имя занято, и true в противном случае
  };

  const ValidationSchema = Yup.object().shape({
    channelName: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .test('is-unique', 'Должно быть уникальным', (value) => uniqValidationChannel(value)),
  });

  const dispatch = useDispatch();

  const token = useSelector(getToken);
  const inputRef = useRef(null);

  const handleCloseWindow = () => {
    dispatch(setShowModalWindow());
  };
  console.log('token in ChannelModal', token);

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus(); // Устанавливаем фокус при монтировании компонента
      }
    }, 100); // Задержка на 100 мс для гарантии, что модальное окно полностью отображено
  }, []);

  const addChannelFunction = async (name, tkn) => {
    const newChannel = { name };

    try {
      const response = await axios.post('/api/v1/channels', newChannel, {
        headers: {
          Authorization: `Bearer ${tkn}`,
        },
      });

      if (response.data) {
        console.log('response.data', response.data);
        dispatch(addChannel(response.data)); // Вызов диспетчера для добавления канала в Redux
        dispatch(setActiveChannel(response.data.id));
        handleCloseWindow(); // Закрытие модального окна после успешного добавления
      }

      console.log('response.data', response.data);
    } catch (error) {
      console.error('Error adding channel:', error);
    }
  };

  return (
    <Modal show onHide={handleCloseWindow} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: '' }}
          validationSchema={ValidationSchema}
          onSubmit={(values, { resetForm }) => {
            addChannelFunction(values.channelName, token);
            resetForm();
          }}
        >
          {({ handleChange, handleBlur, values }) => (
            <Form noValidate>
              <div className="mb-3">
                <Field
                  type="text"
                  name="channelName"
                  placeholder=""
                  autoComplete="off"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.channelName}
                  innerRef={inputRef}
                />
                {console.log(values.channelName)}
                <ErrorMessage name="channelName" component="div" className="text-danger" />
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
export default ChannelModalWindow;
