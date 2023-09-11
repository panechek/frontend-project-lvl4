import React from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  Modal,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
} from 'react-bootstrap';
import { selectors as channelsSelectors } from '../../redux/channelsSlice.js';
import validateChannelName from '../../utils/validateChannelName.js';
import socket from '../../hooks/socket.io.js';

const Add = ({ onHide }) => {
  const [errorName, setErrorName] = React.useState('');
  const channels = useSelector(channelsSelectors.selectAll);
  console.log(channels);
  const inputRef = React.useRef();
  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addNewChannel = (values) => {
    const { name } = values;
    const isValid = validateChannelName(channels, name);
    console.log(isValid);
    if (isValid === '') {
      socket.emit('newChannel', values);
      setErrorName('');
      onHide();
    } else {
      setErrorName(isValid);
    }
  };

  const f = useFormik({ onSubmit: addNewChannel, initialValues: { name: '' } });
  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Добавить канал.</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={f.handleSubmit}>
          <FormGroup >
            <FormControl
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              name="name"
              id="name"
              className="mb-2"
              isInvalid={errorName !== ''}
            />
            <FormLabel htmlFor="name" className="visually-hidden">
              Имя канала
            </FormLabel>
            <FormControl.Feedback type="invalid">{errorName}</FormControl.Feedback>
          </FormGroup>
          <div className="d-flex justify-content-end">
              <Button type="button" variant="secondary" className="me-2" onClick={onHide}>
                Отменить
              </Button>
              <Button type="submit" variant="primary">
                Отправить
              </Button>
            </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
