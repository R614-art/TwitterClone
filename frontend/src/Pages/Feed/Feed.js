import React, { useEffect, useState } from "react";
import TweetBox from "./TweetBox/TweetBox";
import './Feed.css';
import axios from "axios";
import Post from "./Post/Post";

const Feed = () => {

    const [posts,setPosts]=useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/post')
        .then(res=>res.json())
        .then(data=>{
            setPosts(data);
        })
    },[posts])
    return(
        <div className="feed">
            <div className="feed_header">
            <h2>Home</h2>
            </div>
            <TweetBox />
            {
                posts.map(p=><Post key={p._id} p={p} />)
            }
        </div>
    );
};
export default Feed;