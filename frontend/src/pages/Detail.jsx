import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, IconButton, Tooltip, Alert } from '@mui/material';
import axiosInstance from '../utils/axiosInstance';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Cookies from "js-cookie";
import axios from 'axios';

import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';
import SuggestionByLatLong from '../components/SuggestionByLatLong';

export default function Detail() {
    const { Id } = useParams();
    const [itemData, setItemData] = useState();
    const [favorite, setFavorite] = useState(false);
    const [picture, setPicture] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const getItemData = async () => {
        if (Cookies.get("token") !== undefined) {
            try {
                const response = await axiosInstance.get(`/place/id?id=${Id}`);
                setItemData(response.data.data);
                setFavorite(response.data.data.favorite);
            } catch (error) {
                console.error('Error fetching item data:', error);
            }
        } else {
            try {
                const response = await axiosInstance.get(`/place/ids?id=${Id}`);
                setItemData(response.data.data);
            } catch (error) {
                console.error('Error fetching item data:', error);
            }
        }
    };

    const handleFavorite = async () => {
        try {
            const response = await axiosInstance.post(`/fav/toggle`, {
                placeId: Id,
            }, {
                withCredentials: true
            });
            setFavorite(!favorite);
            setAlertMessage(favorite ? "Removed from favorites" : "Added to favorites");
            setAlertOpen(true);
        } catch (error) {
            console.log(error.response.status);
        }
    }

    const getPicture = async () => {
        try {
            const response = await axiosInstance.get(`/place/pic?placeId=${Id}`);
            setPicture(response.data.data);
        } catch (error) {
            console.error('Error fetching item data:', error);
        }
    }

    useEffect(() => {
        getItemData();
        getPicture();
    }, [Id]);

    const LoginCheck = Cookies.get("token") !== undefined ? "block" : "none";

    useEffect(() => {
        if (alertOpen) {
            const timer = setTimeout(() => {
                setAlertOpen(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [alertOpen]);

    return (
        <Box>
            <Navbar />
            <BackButton />
            <Box sx={{
                width: '100%',
            }}>
                {itemData ? (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Box sx={{
                            width: { xs: "80%", lg: "100%" },
                            display: 'flex',
                            flexDirection: { xs: "column", lg: "row" },
                            alignItems: 'center',
                            justifyContent: 'center',
                            pt: '20px',
                            gap: "50px"
                        }}>
                            <img src={itemData.picture} style={{ maxWidth: '500px', width: "90%", height: 'auto', objectFit: 'cover', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)' }} alt="Item" />
                            <Box sx={{
                                width: { xs: "100%", lg: "30%" }
                            }}>
                                <Typography
                                    sx={{
                                        fontSize: '30px',
                                        fontWeight: '700',
                                        textAlign: { xs: 'center', lg: "left" }
                                    }}
                                >
                                    {itemData.title}
                                </Typography>
                                <Typography>{itemData.description}</Typography>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}>
                                    <Tooltip title="Favorite">
                                        <IconButton onClick={handleFavorite}>
                                            {favorite ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon sx={{ color: 'black' }} />}
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                        </Box>

                    </Box>
                ) : (
                    <Typography sx={{ textAlign: 'center', mt: 4 }}>Loading...</Typography>
                )}
            </Box>
            <Box sx={{
                width: "100%",
                py: '50px',
                display: 'flex',
                flexDirection: { xs: 'column', lg: "row" },
                gap: '30px',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {picture.map((item, index) => {
                    return (
                        <img key={index} src={item.picture} style={{ width: '300px', height: '200px', objectFit: 'cover', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }}></img>
                    );
                })}
            </Box>
            <hr style={{width: "90%",marginBottom: '10px',display: (LoginCheck)}}/>
            <Typography sx={{
                fontSize: '30px',
                fontWeight: 'bold',
                textAlign: 'center',
                pb: "20px",
                display: (LoginCheck)
            }}>
                Suggstion
            </Typography>
            <Box sx={{
                display: (LoginCheck)
            }}>
                {itemData && <SuggestionByLatLong current={itemData} />}
            </Box>
            <Alert
                severity="success"
                sx={{ position: 'fixed', bottom: 16, right: 16, display: alertOpen ? 'flex' : 'none' }}
                onClose={() => setAlertOpen(false)}
            >
                {alertMessage}
            </Alert>
        </Box>
    );
}
