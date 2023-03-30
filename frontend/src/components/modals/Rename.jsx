import React, { useEffect, useRef, useDispatch } from 'react';
import { useFormik } from 'formik';
import {
  Modal,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import socket from '../../hooks/socket.io.js';
import { updateChannel } from '../../slices/channelsSlice.js';

// const generateOnSubmit = ({ modalInfo, setItems, onHide }) => (values) => {
//   setItems((items) => {
//     const item = items.find((i) => i.id === modalInfo.item.id);
//     item.body = values.body;
//   });
//   onHide();
// };

const rename = ({ onHide, channel }) => (values) => {
  if (values !== '') {
    const { id } = channel;
    socket.emit('renameChannel', { id, values }, (response) => {
      if (response.status === 'ok') {
        console.log(response);
        onHide();
      } else {
        setTimeout(rename(channel.id, values), 5000);
      }
    });
  }
};

const Rename = (props) => {
  const dispatch = useDispatch();
  const { onHide, modalInfo } = props;
  const { channel } = modalInfo;
  console.log(channel);
  const f = useFormik({ onSubmit: rename(props), initialValues: channel.name });
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.select();
    socket.on('renameChannel', (data) => {
      dispatch(updateChannel({
        id: data.id,
        changes: {
          body: data.name,
        },
      }));
    });
  }, []);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Переименовать канал</Modal.Title>
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
            <div className="mt-2">
              <Button
                variant="secondary"
                className="me-2">Отменить</Button>
              <Button
                variant="primary">Отправить</Button>
            </div>
          </FormGroup>
          {/* <input type="submit" className="btn btn-primary mt-2" value="submit" /> */}
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
