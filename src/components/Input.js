import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faImage } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const sendHandler = async () => {
    if (img) {
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, 'userChats', currentUser.uid), {
        [data.chatId + '.lastMessage']: {
          text,
        },
        [data.chatId + '.date']: serverTimestamp(),
      });
      await updateDoc(doc(db, 'userChats', data.user.uid), {
        [data.chatId + '.lastMessage']: {
          text,
        },
        [data.chatId + '.date']: serverTimestamp(),
      });
    }
    // setText('');
    // setImg(null);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <span id="sendIcon">
          <FontAwesomeIcon icon={faImage} />
        </span>
        <input
          type="file"
          id="file"
          style={{ display: 'none' }}
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <span id="sendIcon">
            <FontAwesomeIcon icon={faFile} />
          </span>
        </label>
        <button onClick={sendHandler}>Send</button>
      </div>
    </div>
  );
};

export default Input;
