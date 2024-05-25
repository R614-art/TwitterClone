import React, { useState } from 'react';
import twitterimg from '../../assets/images/twitter.jpeg';
import XIcon from '@mui/icons-material/X';
import { useCreateUserWithEmailAndPassword,useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import GoogleButton from 'react-google-button';
import { Link,useNavigate } from 'react-router-dom';
import './Login.css'
import axios from 'axios';

const Signup = () => {
    const [userName,setUserName]= useState('');
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState(''); 
    
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
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
        createUserWithEmailAndPassword(email,password);

        const user = {
            username:userName,
            name:name,
            email:email,
        }
        axios.post('http://localhost:5000/register',user);
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
                <XIcon className='Twittericon' style={{ color:'skyblue' }}/>
                <h2 className='heading'>Happening Now!</h2>
                <h3 className='heading1'>Join Twitter today</h3>
                <form onSubmit={ handleSubmit }>
                    <input type='text' placeholder='Username' className='display-name' onChange={(e) => setUserName(e.target.value) }></input>
                    <input type='text' placeholder='Name' className='display-name' onChange={(e) => setName(e.target.value) }/>
                    <input type='email'className='email' placeholder='Email address' onChange={(e) => setEmail(e.target.value) }/>
                    <input type='password' className='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                    <div>
                        <button type='submit' className='btn'>Sign up</button>
                    </div>
                </form>
                <hr />
                <div className='google-button'>
                    <GoogleButton className='g-btn' type='light' onClick={handleGoogleSignIn}></GoogleButton>
                </div>
                <div>
                    Already have an account?
                    <Link to='/Login' style={{
                        textDecoration : 'none',
                        color: 'skyblue',
                        fontWeight: '6000',
                        marginLeft:'5px'
                    }}>
                        Login
                    </Link>
                </div>
                </div>
            </div>
        </div>
    );
}
export default Signup;