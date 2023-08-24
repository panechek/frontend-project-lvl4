import React from 'react';
import { useFormik } from 'formik';
import {
  Modal,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
} from 'react-bootstrap';
import socket from '../../hooks/socket.io.js';

const Add = ({ onHide }) => {
  const [correct, setCorrect] = React.useState(false);
  const inputRef = React.useRef();
  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validateChannelName = (value) => {
    let error;
     if (!value) {
      error = 'Required';
     }
     return error;
  };
   
  const addNewChannel = (values) => {
    const { name } = values;
    if (name === '') {
      setCorrect(true);
      // throw err;
    }
    if (name !== '') {
      socket.emit('newChannel', values);
      onHide();
    }
  };
  
  const f = useFormik({ onSubmit: addNewChannel, initialValues: { name: '' } });
  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Добавить канал</Modal.Title>
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
              // required
              isInvalid={correct}
            />
            <FormLabel htmlFor="name" className="visually-hidden">
              Имя канала
            </FormLabel>
            <FormControl.Feedback type="invalid">the username or password is incorrect</FormControl.Feedback>
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
