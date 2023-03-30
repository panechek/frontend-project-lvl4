import React from 'react';
import { Modal, FormGroup, Button } from 'react-bootstrap';

// BEGIN
const generateOnSubmit = ({ modalInfo, onHide }) => (e) => {
  e.preventDefault();
  // setItems((items) => items.filter((i) => i.id !== modalInfo.item.id));
  onHide();
};

const Remove = (props) => {
  const { onHide } = props;
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
          className="me-2">Отменить</Button>
          <Button variant="danger">Удалить</Button>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
