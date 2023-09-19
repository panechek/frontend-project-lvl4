import React, { useEffect } from 'react';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import socket from '../../hooks/socket.io';

const generateOnSubmit = ({
  modalInfo,
  onHide,
}) => (e) => {
  e.preventDefault();
  console.log(modalInfo);
  socket.emit('removeChannel', modalInfo.item);
  onHide();
};

const Remove = (props) => {
  const { onHide, modalInfo } = props;
  const onSubmit = generateOnSubmit(props);

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
          <Button variant="danger" onClick={onSubmit} >Удалить</Button>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
