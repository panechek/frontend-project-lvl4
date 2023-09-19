import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

const ChannelButton = ({
  channel,
  style,
  changeChannel,
  showModal,
}) => (
  channel.removable
    ? <li className='nav-item w-100'>
      <Dropdown as={ButtonGroup} className='w-100'>
      <Button variant="light" className={style} onClick={() => changeChannel(channel.id)}><span className='me-1'>#</span>
          {channel.name}</Button>

      <Dropdown.Toggle split variant="light" id="dropdown-split-basic" />

      <Dropdown.Menu>
      <Dropdown.Item onClick={() => showModal('removing', channel)}>Удалить</Dropdown.Item>
      <Dropdown.Item onClick={() => showModal('renaming', channel)}>Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </li>
    : <li className='nav-item w-100'>
        <button type='button' className={style} onClick={() => changeChannel(channel.id)}>
          <span className='me-1'>#</span>
          {channel.name}
        </button>
    </li>
);

export default ChannelButton;
