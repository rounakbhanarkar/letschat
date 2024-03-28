import React from 'react';
import "../style.scss";
import { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { auth } from '../firebase';
import {signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {

  const [error, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;
    

    try {
      await signInWithEmailAndPassword(auth,email,password);
      navigate("/");
    }
    catch (error) {
      console.log(error);
      setErr(error.message);
    }

  }
  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className="logo">Lets CHAT</span>
            <span className="title" >Login</span>
            <form onSubmit={handleSubmit}>
                
                <input type="email" placeholder='email' />
                <input type="password" placeholder='password' />
                
                <button>Sign in</button>
            </form>
            {error}
            <p>Don't have an account?<Link to="/register">Register</Link></p>
        </div>
    </div>
  );
};

export default Login