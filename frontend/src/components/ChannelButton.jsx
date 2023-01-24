import React from 'react';

const ChannelButton = ({ channel, style, changeChannel }) => (
  channel.removable
    ? <li className='nav-item w-100'>
        <div className='d-flex dropdown btn-group'>
            <button className='w-100 rounded-0 text-start text-truncate btn btn-secondary'>
                <span className='me-1'>#</span>{channel.name}
            </button>
            <button className='flex-grow-0 dropdown-toggle btn'>

            </button>
        </div>
        {/* <button type='button' className={style} onClick={() => changeChannel(channel.id)}>
              <span className='me-1'>#</span>
              {channel.name}
        </button> */}
    </li>
    : <li className='nav-item w-100'>
        <button type='button' className={style} onClick={() => changeChannel(channel.id)}>
          <span className='me-1'>#</span>
          {channel.name}
        </button>
    </li>
);

export default ChannelButton;
