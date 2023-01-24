import React from 'react';

const Messages = ({ messages }) => {
  console.log(messages);
  return (
    <>{messages.map((message) => (
        <div key={message.id} className='text-break mb-2'>
            <b>{message.username}</b>
            : {message.value}
        </div>
    ))}
    </>
  );
};

export default Messages;
