import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';

const ChannelButton = ({
  channel,
  style,
  changeChannel,
  showModal,
  currentChannel,
}) => {
  const { t } = useTranslation();
  return (
    channel.removable
      ? (
        <li className="nav-item w-100 mb-1">
          <Dropdown as={ButtonGroup} className="d-flex">
            <button
              className={style}
              type="button"
              onClick={() => changeChannel(channel.id)}
            >
              <span className="me-1">#</span>
              {channel.name}
            </button>
            <Dropdown.Toggle
              split
              variant={currentChannel === channel.id ? 'secondary' : 'light'}
              id="dropdown-split-basic"
            >
              <span className="visually-hidden">
                Управление каналом
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => showModal('removing', channel)}>{t('modal.remove')}</Dropdown.Item>
              <Dropdown.Item onClick={() => showModal('renaming', channel)}>{t('modal.rename')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      )
      : (
        <li className="nav-item w-100 mb-1">
          <button
            type="button"
            className={style}
            onClick={() => changeChannel(channel.id)}
          >
            <span className="me-1">#</span>
            {channel.name}
          </button>
        </li>
      )
  );
};

export default ChannelButton;
