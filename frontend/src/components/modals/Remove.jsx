import React, { useEffect } from 'react';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import showToastify from '../../utils/showToastify';
import socket from '../../hooks/socket.io';

const generateOnSubmit = ({
  modalInfo,
  onHide,
}) => (e) => {
  e.preventDefault();
  socket.volatile.emit('removeChannel', modalInfo.item, () => showToastify('Канал удален'));
  onHide();
};

const Remove = (props) => {
  const { onHide } = props;
  const onSubmit = generateOnSubmit(props);
  const enterRef = React.useRef(null);

  React.useEffect(() => {
    enterRef.current.focus();
  }, []);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Уверены?</p>
        <form onSubmit={onSubmit}>
          <FormGroup className="d-flex justify-content-end">
          <Button variant="secondary"
          className="me-2" onClick={onHide} >Отменить</Button>
          <Button
            variant="danger"
            onClick={onSubmit}
            ref={enterRef}
            >Удалить</Button>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
