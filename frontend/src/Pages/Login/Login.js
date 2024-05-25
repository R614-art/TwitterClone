import React, { useState } from 'react';
import twitterimg from '../../assets/images/twitter.jpeg';
import XIcon from '@mui/icons-material/X';
import { useSignInWithEmailAndPassword,useSignInWithGoogle  } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState(''); 
    const [errorMessage,setErrorMessage]=useState('');

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
      const [signInWithGoogle, googleuser, googleloading, googleerror] = useSignInWithGoogle(auth);
      const navigate=useNavigate();
      if(user||googleuser)
        {
            navigate('/');
            console.log(user);
            console.log(googleuser);
        }
        if(error||googleerror)
        {
            console.log(error.message);
            console.log(googleerror.message);
        }
        if(loading||googleloading)
        {
            console.log("loading....");
        }
    const handleSubmit = e => {
        e.preventDefault();
        signInWithEmailAndPassword(email,password);
    }
    const handleGoogleSignIn = () =>
        {
            signInWithGoogle();
        }
    return (
        <div className='login-container'>
            <div className='image-container'>
                <img className='image' src={ twitterimg } alt="" />
            </div>
            <div className='form-container'>
                <div className='form-box'>
                <XIcon />
                <h2 className='heading'>Happening Now!</h2>
                <form onSubmit={ handleSubmit }>
                    <input type='email'className='email' placeholder='Email address' onChange={(e) => setEmail(e.target.value) }/>
                    <input type='password' className='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                    <div>
                        <button type='submit' className='btn'>Login</button>
                    </div>
                </form>
                <hr />
                <div className='google-button'>
                    <GoogleButton className='g-btn' type='light' onClick={handleGoogleSignIn}></GoogleButton>
                </div>
                <div>
                    Don't have an account?
                    <Link to='/Signup' style={{
                        textDecoration : 'none',
                        color: 'skyblue',
                        fontWeight: '6000',
                        marginLeft:'5px'
                    }}>
                    Sign up
                    </Link>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Login;