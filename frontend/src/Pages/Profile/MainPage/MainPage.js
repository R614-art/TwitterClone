import React, { useEffect, useState } from 'react'
import './MainPage.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AddLinkIcon from '@mui/icons-material/AddLink';
import Post from '../../Feed/Post/Post';
import axios from 'axios';
import EditProfile from '../EditProfile/EditProfile'
import LockResetIcon from '@mui/icons-material/LockReset';

const MainPage = ({user}) => {
    const navigate=useNavigate();
    const [loggedInUser]=useLoggedInUser();
    const username = user?.email?.split('@')[0];
    const [posts,setPosts]=useState([]);
    const [loading,setLoading]=useState(false);
    const [imageURL,setImageURL]=useState('');



    useEffect(()=>{
        fetch(`http://localhost:5000/userPost?email=${user?.email}`)
        .then(res=>res.json())
        .then(data=>{
            setPosts(data);
        })
    },[posts])

    const handleUploadCoverImage = (e) =>{
        setLoading(true);
        const image = e.target.files[0];
        const formData =new FormData();
        formData.set('image',image);

        axios.post("https://api.imgbb.com/1/upload?key=735c7c4573006a1488d0ebbcd20fa89b",formData)
        .then(res=>{
            const url=res.data.data.display_url;
            const userCoverImage = {
                email : user?.email,
                coverImage: url
            }
            console.log(userCoverImage);
            setLoading(false)
            if(url){
                axios.patch(`http://localhost:5000/userUpdates/${user?.email}`,userCoverImage)
            }
        })
    }
    const handleUploadProfileImage = (e) =>{
        setLoading(true);
        const image = e.target.files[0];
        const formData =new FormData();
        formData.set('image',image);

        axios.post("https://api.imgbb.com/1/upload?key=735c7c4573006a1488d0ebbcd20fa89b",formData)
        .then(res=>{
            const url=res.data.data.display_url;
            const userProfileImage = {
                email : user?.email,
                profileImage: url
            }
            setLoading(false)
            if(url)
                axios.patch(`http://localhost:5000/userUpdates/${user?.email}`,userProfileImage)
        })
    }

  return (
    <div>
      <ArrowBackIcon className='arrow-Icon' onClick={() => navigate('/')} />
      <h4 className='heading-4'>@{username}</h4>
      <div className='mainProfile'>
        <div className='profile-bio'>
            {
                <div>
                    <div className='coverImageContainer'>
                        <img src={loggedInUser?.coverImage?loggedInUser?.coverImage:'https://downtownpensacola.com/static/img/defaultbanner.jpg'} alt='' className='coverImage'/>
                        <div className='hoverCoverImage'>
                            <label htmlFor='image' className='imageIcon'>
                                {
                                    loading?
                                    <LockResetIcon className='photoIcon photoIconDisabled'/> :
                                    <CenterFocusWeakIcon className='photoIcon'/>
                                }
                            </label>
                            <div className='imageIcon_tweetButton'>
                                <input type='file' id='image' className='imageInput' onChange={handleUploadCoverImage}/>
                            </div>
                        </div>
                    </div>
                    <div className='avatar-img'>
                        <div className='avatarContainer'>
                            <img src={loggedInUser?.profileImage?loggedInUser?.profileImage:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} alt='' className='avatar'/>
                        
                            <div className='hoverAvatarImage'>
                                <div className='imageIcon_tweetButton'>
                                    <label htmlFor='profileImage' className='imageIcon'>
                                    {
                                        loading?
                                        <LockResetIcon className='photoIcon photoIconDisabled'/> :
                                        <CenterFocusWeakIcon className='photoIcon'/>
                                    }
                                    </label>
                                    <div className='imageIcon_tweetButton'>
                                        <input type='file' id='profileImage' className='imageInput' onChange={handleUploadProfileImage}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='userInfo'>
                        <div>
                            <h3 className='heading-3'>
                                {loggedInUser?.name?loggedInUser?.name:user&&user?.displayName}
                            </h3>
                            <p className='usernameSection'>@{username}</p>
                        </div>
                        <EditProfile user={user} loggedInUser={loggedInUser}/>
                        </div>
                        <div className='infoContainer'>
                            {loggedInUser?.bio? loggedInUser?.bio : ''}
                            <div className='locationAndLink'>
                                {loggedInUser?.location ? <p className='subInfo'><MyLocationIcon />{loggedInUser?.location}</p> : ''}
                                {loggedInUser?.website ? <p className='subInfo link'><AddLinkIcon />{loggedInUser?.website}</p> : ''}
                            </div>
                        </div>
                        <h4 className='tweetsText'>Tweets</h4>

                        <hr />
                    {
                        posts.map(p=><Post id={p._id} p={p} />)
                    }
                    </div>
            }
        </div>
      </div>
    </div>
  )
}

export default MainPage;
