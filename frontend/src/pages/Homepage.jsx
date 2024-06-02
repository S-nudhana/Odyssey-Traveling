import React from "react";

import { Box, Typography } from '@mui/material';
import Cookies from "js-cookie";
import { Link, ScrollRestoration } from "react-router-dom"

// import authMiddleware from "../utils/authMiddleware";

import Navbar from '../components/Navbar.jsx';
import ImageCard from '../components/ImageCard';
import BannerHomapage from '../components/BannerHomapage.jsx';
import Suggestion from '../components/Suggestion.jsx';

function LoginCheck() {
  const isLoggedIn = Cookies.get("token") !== undefined;
  return isLoggedIn ? <Suggestion/> : <BannerHomapage/>;
}

function Homepage() {
  return (
    <>
    <ScrollRestoration />
      <Navbar />
      <LoginCheck/>
      <Typography variant = "h4" sx={{
        pt: "100px",
        pb: "30px",
        fontSize: {xs: '25px', sm: "40px"},
        color: '#212529',
        textAlign: 'center',
        fontWeight: 'bold',
      }}>
        Where you want to go
      </Typography>
      <ImageCard/>
    </>
  );
}

export default Homepage;