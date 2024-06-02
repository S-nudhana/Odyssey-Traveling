import React from 'react';
import { Box, ImageListItem, Typography, Button } from '@mui/material';
import background from '../assets/Background.png';
import { Link, useNavigate } from 'react-router-dom';

const picture = [
    {
        title: "Nature",
        pic: "https://images.unsplash.com/photo-1573126617899-41f1dffb196c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        nav: "/nature",
    },
    {
        title: "City",
        pic: "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        nav: "/city",
    }
];

export default function ImageCard() {
    const navigate = useNavigate();
    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'center',
            }}>
                {picture.map((item) => {
                    return (
                        <Box sx={{
                            position: 'relative',
                            width: { xs: "100%", md: "50%" },
                            height: { xs: "100%", md: "50%" },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FBFEFB',
                        }}
                        onClick={() => {
                            navigate(item.nav);
                        }}
                        >
                            <img src={item.pic} alt="background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <Typography variant='h5' sx={{
                                position: 'absolute',
                                height: '100%',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                transition: '0.3s',
                                color: '#FBFEFB',
                                cursor: 'pointer',
                                ":hover": {
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                    fontSize: '30px',
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '2px',
                                }
                            }}>
                                {item.title}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        </>
    );
}