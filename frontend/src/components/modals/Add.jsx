import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import _ from 'lodash';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import socket from '../../hooks/socket.io.js';
import { addChannel } from '../../slices/channelsSlice.js';

const addNewChannel = ({ onHide }) => (channel) => {
  console.log(channel);
  if (channel !== '') {
    socket.emit('newChannel', channel, (response) => {
      if (response.status === 'ok') {
        console.log(response);
        onHide();
      } else {
        setTimeout(addNewChannel(channel), 5000);
      }
    });
  }
};

const Add = (props) => {
  const dispatch = useDispatch();
  const { onHide } = props;
  const f = useFormik({ onSubmit: addNewChannel(props), initialValues: { body: '' } });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
    socket.on('newChannel', (channel) => {
      console.log(channel);
      dispatch(addChannel(channel));
    });
  }, []);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Add</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.body}
              data-testid="input-body"
              name="body"
            />
          </FormGroup>
          <input type="submit" className="btn btn-primary mt-2" value="submit" />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
