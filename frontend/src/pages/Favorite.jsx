import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Link, ScrollRestoration } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';

function textLength(text) {
    if (text.length >= 200) {
        return text.slice(0, 350) + "...";
    }
    return text;
}

export default function Favorite() {
    const [favoritesData, setFavoritesData] = useState([]);
    const [all, setAll] = useState([]);

    const getFavoritesData = async () => {
        try {
            const response = await axiosInstance.get(`/fav/all`);
            if (Array.isArray(response.data.data)) {
                setFavoritesData(response.data.data);
            } else {
                console.error('Invalid data format for favorites:', response.data.data);
            }
        } catch (error) {
            console.error('Error fetching favorite data:', error);
        }
    };

    const getAll = async () => {
        try {
            const response = await axiosInstance.get(`/place/all`);
            if (Array.isArray(response.data.data)) {
                setAll(response.data.data);
            } else {
                console.error('Invalid data format for places:', response.data.data);
            }
        } catch (error) {
            console.error('Error fetching all places data:', error);
        }
    };

    const handleFavorite = async (placeId) => {
        try {
            const response = await axiosInstance.post(`/fav/toggle`, {
                placeId: placeId,
            }, {
                withCredentials: true
            });
            if (response.status === 200) {
                setFavoritesData((prevFavoritesData) => {
                    if (prevFavoritesData.some(fav => fav.placeId === placeId)) {
                        return prevFavoritesData.filter(fav => fav.placeId !== placeId);
                    } else {
                        return [...prevFavoritesData, { placeId }];
                    }
                });
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    useEffect(() => {
        getFavoritesData();
        getAll();
    }, []);

    // Extract favorite place IDs
    const favoriteIds = new Set(favoritesData.map(fav => fav.placeId));

    // Filter all places to include only favorites
    const filteredPlaces = all.filter(place => favoriteIds.has(place.Id));

    return (
        <>
            <ScrollRestoration />
            <Navbar />
            <BackButton />
            <Box sx={{ pb: '40px' }}>
                <Typography variant='h4' sx={{
                    textAlign: "center",
                    pt: "20px",
                    pb: "30px",
                    fontSize: { xs: '25px', sm: "40px" },
                    fontWeight: "bold"
                }}>
                    Favorites
                </Typography>
                <Box sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "25px",
                }}>
                    {filteredPlaces.map((item) => (
                        <Box key={item.Id} sx={{
                            width: { xs: "300px", sm: "550px", lg: "620px" },
                            height: { xs: "auto", lg: "200px" },
                            background: "#FBFEFB",
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            borderRadius: "20px",
                            p: "20px",
                            alignContent: "center",
                            transition: ".3s",
                            border: "2px solid transparent",
                            ":hover": {
                                borderColor: "#AF8F6F"
                            }
                        }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: { xs: "column", lg: 'row' },
                                justifyContent: { xs: "center", lg: 'flex-start' },
                                alignItems: { xs: 'center', lg: "flex-start" }
                            }}>
                                <Box sx={{
                                    width: { xs: '90%', lg: '40%' },
                                    height: { xs: 'auto', lg: '200px' },
                                    objectFit: 'cover'
                                }}>
                                    <img src={item.picture} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '15px' }} alt="Waiting for Image" />
                                </Box>
                                <Box sx={{ width: "90%", px: { xs: '20px', lg: '30px' }, pt: { lg: "10px" } }}>
                                    <Typography variant='h3' sx={{
                                        fontSize: '24px',
                                        fontWeight: 'bold',
                                        pt: { xs: '20px', lg: '0' }
                                    }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant='h4' sx={{
                                        width: '100%',
                                        borderRadius: '12px',
                                        color: "black",
                                        fontWeight: 300,
                                        fontSize: '16px',
                                        py: "1px",
                                        my: "7px"
                                    }}>
                                        {textLength(item.description)}
                                    </Typography>
                                    <Typography variant='h1' sx={{
                                        fontSize: '50px',
                                        fontWeight: 400,
                                        color: "black"
                                    }}>
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: {xs: "flex-start",lg:'flex-end'},
                                mt: {xs: "0", lg: "-30px"}
                            }}>
                                <IconButton onClick={() => handleFavorite(item.Id)}>
                                    {favoriteIds.has(item.Id) ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon sx={{ color: 'black' }} />}
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    );
}
