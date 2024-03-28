import React, { useState } from 'react';
import "../style.scss";
import Avatar from '../img/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

  const [error, setErr] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {

      const response = await createUserWithEmailAndPassword(auth, email, password)

      const storageRef = ref(storage, `${displayName}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',

      
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.log(error);
          setErr(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(response.user, {
              displayName,
              photoURL: downloadURL,
            });

            await (setDoc(doc(db, "users", response.user.uid), {

              uid: response.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            }))

            await setDoc(doc(db,"userChats",response.user.uid),{});
            navigate("/");

          });
        }
      );
      setErr("Registration successfull. Please wait while loading......")
    }
    catch (error) {
      console.log(error);
      setErr(error.message);
    }

  }
  if(error){

  }
  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className="logo">Lets CHAT</span>
        <span className="title" >Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='display name' />
          <input type="email" placeholder='email' />
          <input type="password" placeholder='password' />
          <input style={{ display: "none" }} type="file" id='file' />
          <label htmlFor="file">
            <img src={Avatar} alt="" />
            <span>Add profile picture</span>
          </label>
          <button>Sign Up</button>
        </form>
          <span style={{width:'70%',textAlign:'center'}}>{error}</span>
        <p>Already have an account?<Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register