import React from 'react'
import { Box, Button, Typography, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

import logo from "../assets/logoBlack.jpeg"
import LandscapeIcon from '@mui/icons-material/Landscape';//mountai
import BeachAccessRoundedIcon from '@mui/icons-material/BeachAccessRounded';//beach
import AgricultureRoundedIcon from '@mui/icons-material/AgricultureRounded';//farm
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';//camp
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';//adventure
import WaterfallChartRoundedIcon from '@mui/icons-material/WaterfallChartRounded';// waterfall
import TempleBuddhistRoundedIcon from '@mui/icons-material/TempleBuddhistRounded';//temple
import StarRoundedIcon from '@mui/icons-material/StarRounded';// landmark
import StoreMallDirectoryRoundedIcon from '@mui/icons-material/StoreMallDirectoryRounded';//mall

import BackButton from '../components/BackButton';

const btn = [
    {
        icon: <LandscapeIcon />,
        name: "Mountain",
    },
    {
        icon: <BeachAccessRoundedIcon />,
        name: "Beach",
    },
    {
        icon: <AgricultureRoundedIcon />,
        name: "Farm",
    },
    {
        icon: <LocalFireDepartmentRoundedIcon />,
        name: "Camping",
    },
    {
        icon: <DirectionsRunRoundedIcon />,
        name: "Adventure",
    },
    {
        icon: <WaterfallChartRoundedIcon />,
        name: "Waterfall",
    },
    {
        icon: <TempleBuddhistRoundedIcon />,
        name: "Temple",
    },
    {
        icon: <StarRoundedIcon />,
        name: "LandMark",
    },
    {
        icon: <StoreMallDirectoryRoundedIcon />,
        name: "Mall",
    },
]

export default function Preference() {
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        console.log("TRIGGERED")
        const response = await axiosInstance.post(`/user/postTag?tag=${data}`);
    }

    function handleFinish() {
        navigate("/");
    }


    return (
        <>
            <Box sx={{ mt: "-80px" }}>
                <BackButton />
            </Box>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100vw",
                flexDirection: "column",
                mt: "-80px"
            }}>
                <Box sx={{
                    width: '500px',
                    maxWidth: '60%',
                    height: 'auto',
                    boxShadow: '5',
                    backgroundColor: '#FBFEFB',
                    p: '35px 60px',
                    borderRadius: '20px'
                }}>
                    <center><img src={logo} style={{ height: '150px' }} alt="Logo" /></center>
                    <Typography variant="h6" sx={{
                        textAlign: 'center',
                        fontWeight: '600',
                        color: '#545454'
                    }}>
                        Preference
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        flexWrap: 'wrap',
                        py: '25px',
                        gap: "20px"
                    }}>
                        {btn.map((item, index) => (
                            <Button
                                key={index}
                                onClick={() => handleSubmit(item.name)}
                                sx={{
                                    px: "30px",
                                    backgroundColor: "#9F6F4F",
                                    color: "#FBFEFB",
                                    fontSize: '16px',
                                    borderRadius: "15px",
                                    textTransform: 'none',
                                    ":hover": {
                                        backgroundColor: "#9F6F4F",
                                    }
                                }}>
                                <Box sx={{
                                    display: 'flex',
                                    gap: '10px',
                                    alignItems: 'center'
                                }}>
                                    {item.icon}
                                    {item.name}
                                </Box>
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mt: '10px',
                    }}>
                        <Button
                            variant="contained"
                            disableRipple
                            sx={{
                                color: '#FBFEFB',
                                width: '60%',
                                backgroundColor: '#4169E1',
                                borderRadius: '10px',
                                p: '12px',
                                ":hover": {
                                    backgroundColor: '#3159E1',
                                }
                            }}
                            onClick={handleFinish}
                        >
                            Finish
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}