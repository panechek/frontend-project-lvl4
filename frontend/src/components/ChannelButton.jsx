import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const ChannelButton = ({
  channel,
  style,
  changeChannel,
  showModal,
}) => (
  channel.removable
    ? <li className='nav-item w-100 d-flex'>
        <button
            type='button'
            className={style}
            onClick={() => changeChannel(channel.id)}
        >
          <span className='me-1'>#</span>
          {channel.body}
        </button>
        <DropdownButton
            align="end"
            id="dropdown-menu-align-end"
            variant="light"
        >
            <Dropdown.Item onClick={() => showModal('removing', channel)}>Удалить</Dropdown.Item>
            <Dropdown.Item onClick={() => showModal('renaming', channel)}>Переименовать</Dropdown.Item>
        </DropdownButton>

    </li>
    : <li className='nav-item w-100'>
        <button type='button' className={style} onClick={() => changeChannel(channel.id)}>
          <span className='me-1'>#</span>
          {channel.name}
        </button>
    </li>
);

export default ChannelButton;
