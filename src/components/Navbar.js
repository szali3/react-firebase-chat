import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';
import { signOut, updateProfile } from 'firebase/auth';
import { db, storage, auth } from '../firebase';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(currentUser.photoURL);

  const avatarHandler = async (e) => {
    const file = e.target.files[0];

    try {
      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${currentUser.displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(currentUser, {
              displayName: currentUser.displayName,
              photoURL: downloadURL,
            });

            await updateDoc(doc(db, 'users', currentUser.uid), {
              photoURL: downloadURL,
            });
            setAvatar(currentUser.photoURL);
          } catch (err) {
            console.log(err);
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar">
      <img
        className="logoImg"
        src="https://img.icons8.com/bubbles/344/speech-bubble-with-dots.png"
        alt=""
      />
      <div className="user">
        <input
          id="avatar"
          type="file"
          style={{ display: 'none' }}
          onChange={avatarHandler}
        />
        <label htmlFor="avatar">
          <img src={avatar} />
        </label>
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
