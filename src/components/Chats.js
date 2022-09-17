import React, { useState, useEffect, useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const avatarArr = [];

  useEffect(() => {
    const getChat = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        console.log('userCharts ==>', doc.data());
        console.log(
          'userChart =>',
          Object.entries(doc.data()).map((chat) => {
            console.log('userChat =====> ', chat[1].userInfo.uid);
            avatarArr.push(chat[1].userInfo.uid);
          })
        );
        setChats(doc.data());
        setAvatar(avatarArr);
      });

      return () => {
        unsub();
      };
    };
    console.log('currentUser ==>', currentUser.uid);
    currentUser.uid && getChat();
  }, [currentUser.uid]);

  const selectHandler = (u) => {
    dispatch({ type: 'CHANGE_USER', payload: u });
  };

  console.log(avatarArr);
  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat, i) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => selectHandler(chat[1].userInfo)}
          >
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
