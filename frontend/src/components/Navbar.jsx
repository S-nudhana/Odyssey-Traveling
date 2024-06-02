import React, { useState } from 'react'
import { AppBar, IconButton, Box, Button, ImageList,Drawer } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

import logo from "../assets/logo.png"

export default function Navbar() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const login = (
        <span>
            <Button sx={{ fontSize: '16px', color: '#E5E4E2', mx: '20px', textTransform: 'none', ":hover" : {color: '#FBFEFB', backgroundColor: 'transparent'} }} disableRipple onClick={() => {
                    navigate("/favorite");
                }}>
                    Favorite
            </Button>
            <Button sx={{ fontSize: '16px', color: '#E5E4E2', mx: '20px', textTransform: 'none', ":hover" : {color: '#FBFEFB', backgroundColor: 'transparent'} }} disableRipple onClick={() => {
                    navigate("/profile");
                }}>
                    Profile
            </Button>
            <Button sx={{ width: "80px",fontSize: '16px', color: '#FBFEFB', backgroundColor: '#D32F2F', mx: '20px', px: '15px', textTransform: 'none', borderRadius: '10px',":hover" : {backgroundColor: '#B71C1C'} }} disableRipple 
                onClick={() => {
                    Cookies.remove("token");
                    navigate("/");
                    window.location.reload();
                }}>
                    Logout
            </Button>
        </span>
    );

    const logout = (
        <Button sx={{ fontSize: '16px', color: '#FBFEFB', backgroundColor: '#4169E1', mx: '20px', px: '15px', textTransform: 'none', borderRadius: '10px',":hover" : {backgroundColor: '#3159E1'} }} disableRipple 
            onClick={() => { 
                navigate("/signin");
            }}>
                Login
        </Button>
    );

    const loginDrawer = (
        <span style={{display: 'flex', flexDirection: 'column', alignItems: "center"}}>
            <Button sx={{ fontSize: '16px', color: '#212529', mx: '20px', textTransform: 'none' }} disableRipple onClick={() => {
                    navigate("/favorite");
                }}>
                    Favorite
            </Button>
            <hr style={{border: '0.5px solid gray', width: "70%", marginBottom: "20px"}}/>
            <Button sx={{ fontSize: '16px', color: '#212529', mx: '20px', textTransform: 'none' }} disableRipple onClick={() => {
                    navigate("/profile");
                }}>
                    Profile
            </Button>
            <hr style={{border: '0.5px solid gray', width: "70%", marginBottom: "20px"}}/>
            <Button sx={{ width: "70%",fontSize: '16px', color: '#FBFEFB', backgroundColor: '#D32F2F', mx: '20px', px: '15px', py: "10px", textTransform: 'none', borderRadius: '10px',":hover" : {backgroundColor: '#B71C1C'} }} disableRipple 
                onClick={() => {
                    Cookies.remove("token");
                    navigate("/");
                }}
                
                >
                    Logout
            </Button>
        </span>
    );

    const logoutDrawer = (
        <span style={{display: "flex",flexDirection: "column" ,alignItems: "center",}}>
            <Button sx={{ width: "70%",fontSize: '16px', color: '#FBFEFB', backgroundColor: '#4169E1', mx: '20px', px: '15px', py: "10px",textTransform: 'none', borderRadius: '10px',":hover" : {backgroundColor: '#3159E1'} }} disableRipple 
                onClick={() => { 
                    navigate("/signin");
                }}>
                    Login
            </Button>
        </span>
    );

    const drawer = (
        <Box sx={{
            height: '100vh',
            width: '30vh',
            backgroundColor: '#F8F9FA'
        }}>
            <IconButton onClick={toggleDrawer(false)} sx={{
                ml: '2vh',
                mt: '10px',
                color: '#212529',
            }}>
                <CloseIcon/>
            </IconButton>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                pt: "20px",
                gap: '10px'
            }}>
                <Button sx={{ fontSize: '16px', color: '#212529', mx: '20px', textTransform: 'none' }} disableRipple onClick={() => {navigate("/")}}>Home</Button>
                <hr style={{border: '0.5px solid gray', width: "70%"}}/>
                <Button sx={{ fontSize: '16px', color: '#212529', mx: '20px', textTransform: 'none' }} disableRipple>Nature</Button>
                <hr style={{border: '0.5px solid gray', width: "70%"}}/>
                <Button sx={{ fontSize: '16px', color: '#212529', mx: '20px', textTransform: 'none' }} disableRipple>City</Button>
                <hr style={{border: '0.5px solid gray', width: "70%"}}/>
                <LoginDrawerCheck />
            </Box>
        </Box>
    );

    function LoginCheck () {
        const isLoggedIn = Cookies.get("token") !== undefined;
        return isLoggedIn ? login : logout; 
    }

    function LoginDrawerCheck () {
        const isLoggedIn = Cookies.get("token") !== undefined;
        return isLoggedIn ? loginDrawer : logoutDrawer; 
    }

    return (
        <>
            <AppBar sx={{
                height: "75px",
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#AF8F6F',
            }}>
                <IconButton onClick={toggleDrawer(true)} sx={{
                    ml: '20px',
                    display: { xs: 'block', md: 'none' },
                    color: '#FBFEFB'
                }}>
                    <MenuIcon />
                </IconButton>
                <ImageList sx={{
                    pl: {md: "30px", lg: '50px'},
                    pr: {xs: "11vh", sm: "25vh", lg: '0'},
                }}>
                    <img src={logo} style={{width: '80px'}}></img>
                </ImageList>
                <Box sx={{
                    pr: '20px',
                    display: { xs: 'none', md: 'block' }
                }}>
                    <Button sx={{ fontSize: '16px', color: '#E5E4E2', mx: '20px', textTransform: 'none', ":hover" : {color: '#FBFEFB', backgroundColor: 'transparent'} }} disableRipple onClick={() => {navigate("/");}}>Home</Button>
                    <Button sx={{ fontSize: '16px', color: '#E5E4E2', mx: '20px', textTransform: 'none', ":hover" : {color: '#FBFEFB', backgroundColor: 'transparent'} }} disableRipple onClick={() => {navigate("/nature");}}>Nature</Button>
                    <Button sx={{ fontSize: '16px', color: '#E5E4E2', mx: '20px', textTransform: 'none', ":hover" : {color: '#FBFEFB', backgroundColor: 'transparent'} }} disableRipple onClick={() => {navigate("/city");}}>City</Button>
                    <LoginCheck />
                </Box>
            </AppBar>
            <Drawer anchor={'left'} open={open} onClose={toggleDrawer(false)}>
                {drawer}
            </Drawer>
        </>
    )
}