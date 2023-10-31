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
import { useTranslation } from 'react-i18next';

import showToastify from '../../utils/showToastify.js';
import { selectors as channelsSelectors } from '../../redux/channelsSlice.js';
import validateChannelName from '../../utils/validateChannelName.js';
import { useSocket } from '../../contexts/SocketContext.jsx';

const Add = ({ onHide }) => {
  const [errorName, setErrorName] = React.useState('');
  const channels = useSelector(channelsSelectors.selectAll);
  const inputRef = React.useRef();
  const socket = useSocket();
  const { t } = useTranslation();
  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addNewChannel = (values) => {
    const { name } = values;
    const isValid = validateChannelName(channels, name);
    if (isValid === '') {
      socket.socketOn.newChannel(values);
      showToastify(t('modal.channelHasCreated'), true);
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
        <Modal.Title>{t('modal.addChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={f.handleSubmit}>
          <FormGroup>
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
              {t('modal.channelName')}
            </FormLabel>
            <FormControl.Feedback type="invalid">{errorName}</FormControl.Feedback>
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button
              type="button"
              variant="secondary"
              className="me-2"
              onClick={onHide}
            >
              {t('modal.cancel')}
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              {t('modal.send')}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
