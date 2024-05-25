import {Avatar,Button} from '@mui/material';
import React, { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import axios from 'axios';
import './TweetBox.css';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const TweetBox =() => {
    const user=useAuthState(auth);
    const [post,setPost]=useState('');
    const [imageURL,setImageURL]=useState('');
    const [name,setName]=useState('');
    const [userName,setUserName]=useState('');
    const [loading,setLoading]= useState(false);
    const [loggedInUser] = useLoggedInUser();
    const email=user[0]?.email;
    //const  userProfilePic=loggedInUser?.profileImage:
    const userProfilePic = loggedInUser?.profileImage? loggedInUser?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"

    const handleUploadImage = (e) =>{
        setLoading(true);
        const image = e.target.files[0];
        const formData =new FormData();
        formData.set('image',image);

        axios.post("https://api.imgbb.com/1/upload?key=735c7c4573006a1488d0ebbcd20fa89b",formData)
        .then(res=>{
            setImageURL(res.data.data.display_url)
            console.log(res.data.data.display_url);
            setLoading(false)
        })
        .catch((error) => {
            console.log(error);
            setLoading(false)
        })
    }

    const handleTweet = e =>{
        e.preventDefault();
        if(user[0]?.providerData[0]?.providerId==='password'){
            fetch(`http://localhost:5000/loggedinuser?email=${email}`)
            .then(res => res.json())
            .then( data => {
                setName(data?.name);
                setUserName(data?.username);
                
            })
        }
        else{
            setName(user?.displayName);
            setUserName(email.split('@')[0])
        }
        if(name)
        {
            const userPost={
                profilePhoto:userProfilePic,
                post:post,
                photo:imageURL,
                username:userName,
                name:name,
                email:email
            }
            setPost('');
            setImageURL('');
            fetch(`http://localhost:5000/post`,{
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(userPost)
            })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data);
                })
        }
    }

    return(
        <div className='tweetBox'>
            <form onSubmit={handleTweet}>
                <div className='tweetBox_input'>
                    <Avatar src={loggedInUser?.profileImage?loggedInUser?.profileImage:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'}/>
                    <input
                        type='text'
                        placeholder="what's happenning?"
                        value={post}
                        onChange={(e)=> setPost(e.target.value)}
                    />
                </div>
                <div className='imageIcon_tweetButton'>
                    <label htmlFor='image' className='imageIcon'>
                        {
                            loading?<p>uploading image</p>: <p>{imageURL?'image uploaded':<AddPhotoAlternateIcon />}</p>
                        }
                    </label>
                    <input 
                        type='file'
                        id='image'
                        className='imageInput'
                        onChange={handleUploadImage}
                    />
                    <Button className='tweetBox_tweetButton' type='submit'>Tweet</Button>
                </div>
            </form>
        </div>
    );
    

};

export default TweetBox;