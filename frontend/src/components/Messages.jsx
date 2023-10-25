import React from 'react';
import filter from 'leo-profanity';

const Messages = ({ messages }) => {
  filter.list();
  filter.clearList();

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('fr'));
  filter.add(filter.getDictionary('ru'));

  filter.list();
  return (
      <>
        {messages.map((message) => (
          <div key={message.id} className='text-break mb-2'>
            <b>{message.username}</b>
            : {filter.clean(message.value)}
          </div>
        ))}
      </>
  );
};

export default Messages;
