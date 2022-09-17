import React, { useContext } from 'react';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faEllipsis,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <FontAwesomeIcon icon={faUserPlus} />
          <FontAwesomeIcon icon={faVideo} />
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
