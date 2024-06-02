import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from "react-router-dom"

import axiosInstance from '../utils/axiosInstance';

function textLength(text) {
    if (text.length >= 200) {
        return text.slice(0, 320) + "...";
    }
    return text;
}

export default function Suggestion() {
    const [data, setData] = useState([]);
    const [tag, setTag] = useState([]);
    const getData = async () => {
        const response = await axiosInstance.get(`/place/all`);
        setData(response.data.data);
    };
    
    const getTag = async () => {
        const response = await axiosInstance.get(`/user/tag`);
        setTag(response.data.data);
    }
    useEffect(() => {
        getData();
        getTag();
    }, []);
    console.log(data)
    console.log(tag)

    let filterByTag = []
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    tag.forEach((el) => {
        const result = data.filter((e) => e.tags == el.tag);
        filterByTag = filterByTag.concat(result);
    });
    
    filterByTag = shuffleArray(filterByTag);
    console.log(filterByTag)

    return (
        <>
            <Typography sx={{
                pt: "120px",
                fontSize: {xs: "30px", md: "40px"},
                fontWeight: "bold",
                textAlign: 'center',
                pb: "20px"
            }}>
                Personalize For You
            </Typography>
            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "25px",
                pb: "50px"
            }}>
                {filterByTag.map((item, key) => {
                    if (key < 4) {
                        return (
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
                            }}
                                onClick={() => {
                                    navigate(`/detail/${encodeURIComponent(item.Id)}`);
                                    window.scrollTo(0, 0)
                                }
                                }
                            >
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
                            </Box>
                        );
                    }
                })}
            </Box >
        </>
    )
}