import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import { Modal, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { getToken } from '../slices/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import {
  setActiveChannel,
  setShowModalWindow,
  addChannel,
  setShowNoticeForCreateChannel,
} from '../slices/channelSlice';

const ChannelModalWindow = () => {
  filter.loadDictionary('ru');
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.channels);

  const uniqValidationChannel = (name) => {
    const uniqCnannel = channels.find((channel) => channel.name === name);
    console.log('uniqCnannel', uniqCnannel);
    return !uniqCnannel; // Возвращаем false, если имя занято, и true в противном случае
  };

  const ValidationSchema = Yup.object().shape({
    channelName: Yup.string()
      .min(3, t('validation.min'))
      .max(20, t('validation.min'))
      .test('is-unique', t('validation.uniq'), (value) => uniqValidationChannel(value)),
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
    console.log('addChannelFunction');
    const cleanedChannelName = filter.clean(name);
    console.log('Cleaned Channel Name:', cleanedChannelName); // Log cleaned channel name
    const newChannel = { name: cleanedChannelName };

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
        // notice
        dispatch(setShowNoticeForCreateChannel());
      }

      console.log('response.data', response.data);
    } catch (error) {
      console.error('Error adding channel:', error);
    }
  };

  return (
    <Modal show onHide={handleCloseWindow} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: '' }}
          validationSchema={ValidationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log('values.channelName', values.channelName);
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
                <Button variant="secondary" onClick={handleCloseWindow}>{t('interfaces.cancel')}</Button>
                <Button variant="primary" type="submit">{t('messages.send')}</Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
export default ChannelModalWindow;
