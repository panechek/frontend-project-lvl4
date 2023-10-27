import React, { useEffect } from 'react';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../contexts/SocketContext.jsx';
import showToastify from '../../utils/showToastify';

const Remove = ({ onHide, modalInfo }) => {
  const enterRef = React.useRef(null);
  const { t } = useTranslation();
  const socket = useSocket();

  React.useEffect(() => {
    enterRef.current.focus();
  }, []);

  const generateOnSubmit = (e) => {
    e.preventDefault();
    socket.socketOn.removeChannel(modalInfo.item);
    showToastify(t('modal.channelHasRemoved'), true);
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
