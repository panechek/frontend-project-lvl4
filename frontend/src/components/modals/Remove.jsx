import React, { useEffect } from 'react';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import showToastify from '../../utils/showToastify';
import socket from '../../hooks/socket.io';

const Remove = ({ onHide, modalInfo }) => {
  const enterRef = React.useRef(null);
  const { t } = useTranslation();
  React.useEffect(() => {
    enterRef.current.focus();
  }, []);

  const generateOnSubmit = (e) => {
    e.preventDefault();
    socket.volatile.emit('removeChannel', modalInfo.item, () => showToastify(t('modal.channelHasRemoved')));
    onHide();
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.sure')}</p>
        <form onSubmit={generateOnSubmit}>
          <FormGroup className="d-flex justify-content-end">
          <Button variant="secondary"
          className="me-2" onClick={onHide}>{t('modal.cancel')}</Button>
          <Button
            variant="danger"
            onClick={generateOnSubmit}
            ref={enterRef}
            >{t('modal.remove')}</Button>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
