import React from 'react'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box,Typography } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";

export default function BackButton() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };
    return (
        <>
            <Box onClick={handleBackClick}sx={{
                pt: '115px',
                pl: '40px',
                display: "flex",
                alignItems: 'center',
                cursor: "pointer",
            }}>
                <ArrowBackIosIcon sx={{
                    fontSize: 'medium',
                    ml: "10px"
                }}></ArrowBackIosIcon>
                <Typography sx={{
                    ":hover":{
                        textDecoration: 'underline',
                        textUnderlineOffset: "3px"
                    }
                }}>
                    Back
                </Typography>
            </Box>
        </>
    )
}
