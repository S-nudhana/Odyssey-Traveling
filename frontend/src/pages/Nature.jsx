import React, {useState ,useEffect} from 'react'
import { Box, Typography } from '@mui/material';
import { Link, ScrollRestoration } from "react-router-dom"
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

import Navbar from '../components/Navbar'
import BackButton from '../components/BackButton'

function textLength(text) {
    if (text.length >= 200) {
        return text.slice(0, 350) + "...";
    }
    return text;
}


export default function Nature() {

    const [natureData, setNatureData] = useState();
    const getNatureData = async () => {
        const response = await axiosInstance.get(`/place/all`);
        setNatureData(response.data.data);
    };
    useEffect(() => {
        getNatureData();
    }, []);
    return (
        <>
        <ScrollRestoration/>
            <Navbar/>
            <BackButton/>
            <Box sx={{
                pb: '40px'
            }}>
                <Typography variant='h4' sx={{
                    textAlign: "center",
                    pt: "20px",
                    pb: "30px",
                    fontSize: {xs: '25px', sm: "40px"},
                    fontWeight: "bold"
                }}>
                    Nature
                </Typography>
                <Box sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "25px",
                }}>
                    {natureData && natureData.filter(item => item.type === "Nature").map((item) => {
                        return (
                            <Link key={item.Id} to={`/detail/${encodeURIComponent(item.Id)}`} style={{textDecoration: "none", color: "black"}}>
                                <Box sx={{
                                    width: { xs: "300px", sm: "550px", lg: "620px" },
                                    height: { xs: "auto", lg: "200px" },
                                    background: "#FBFEFB",
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    borderRadius: "20px",
                                    p: "20px",
                                    alignContent: "center",
                                    transition: ".3s",
                                    border: "2px solid transparent",
                                    cursor: 'pointer',
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
                                        <Box sx={{ width: "90%",px: { xs: '20px', lg: '30px' }, pt: {lg: "10px"}}}>
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
                                </Box>
                            </Link>
                        );
                    })}
                </Box>
            </Box>
        </>
    )
}
