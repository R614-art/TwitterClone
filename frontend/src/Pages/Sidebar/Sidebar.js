import React, { useState } from "react";
import './Sidebar.css';
import XIcon from '@mui/icons-material/X';
import SidebarOptions from "./SidebarOptions";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreIcon from '@mui/icons-material/More';
import DoneIcon from '@mui/icons-material/Done';
//import ListItemIcon from '@mui/icons-material/ListItemIcon';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar, Button, Divider, Icon, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import CustomLink from "./CustomLink";
import useLoggedInUser from "../../hooks/useLoggedInUser";

const Sidebar = ({handleLogout,user}) => {
    const [anchorE1,setAnchorE1]=useState(null);
    const openMenu = Boolean(anchorE1);
    const [loggedInUser] = useLoggedInUser();

    const handleClick = e => {
        setAnchorE1(e.currentTarget);
    }
    const handleClose = () => {
        setAnchorE1(null);
    }

    const userProfilePic = loggedInUser?.profileImage? loggedInUser?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"

    return(
        <div className="sidebar">
            <XIcon className="sidebar_twitterIcon"/>
            <CustomLink to='/Home/Feed'>
                <SidebarOptions active Icon={ HomeIcon } text='Home' />
            </CustomLink>
            <CustomLink to='/Home/Explore'>
                <SidebarOptions active Icon={ SearchIcon } text='Explore' />
            </CustomLink>
            <CustomLink to='/Home/Notifications'>
                <SidebarOptions active Icon={ NotificationsIcon } text='Notifications' />
            </CustomLink>
            <CustomLink to='/Home/Messages'>
                <SidebarOptions active Icon={ MailIcon } text='Messages' />
            </CustomLink>
            <CustomLink to='/Home/Bookmarks'>
                <SidebarOptions active Icon={ BookmarkIcon } text='Bookmarks' />
            </CustomLink>
            <CustomLink to='/Home/Lists'>
                <SidebarOptions active Icon={ ListAltIcon } text='Lists' />
            </CustomLink>
            <CustomLink to='/Home/Profile'>
                <SidebarOptions active Icon={ PermIdentityIcon } text='Profile' />
            </CustomLink>
            <CustomLink to='/Home/More'>
                <SidebarOptions active Icon={ MoreHorizIcon } text='More' />
            </CustomLink>
            <Button variant="outlined" className="sidebar_tweet">
                Tweet
            </Button>

            <div className="Profile_info">
                <Avatar src={userProfilePic}></Avatar>
                <div className="user_info">
                    <h4>{loggedInUser.name}</h4>
                    <h5>@{loggedInUser.username}</h5>
                </div>
                <IconButton 
                    size="small" 
                    sx={{ml:2}} 
                    aria-controls={openMenu?"basic-menu":undefined} 
                    aria-haspopup='true'
                    aria-expanded={openMenu?"true":undefined}
                    onClick={handleClick}
                >
                    <MoreHorizIcon/>
                </IconButton>
                <Menu id="basic-menu" anchorEl={anchorE1} open={openMenu} onClick={handleClose} onClose={handleClose}>
                    <MenuItem className="Profile_info1">
                        <Avatar src={userProfilePic} />                 
                        <div className="user_info  subUser_info">
                            <div>
                                <h4>{loggedInUser.name}</h4>
                                <h5>@{loggedInUser.username}</h5>
                            </div>
                            <ListItemIcon className="done_icon"><DoneIcon /></ListItemIcon>
                        </div>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                        Add an existing account
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Log out @abcd</MenuItem>
                </Menu>
            </div>
        </div>
    );
};
export default Sidebar;