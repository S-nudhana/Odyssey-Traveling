import React, { useState, useEffect } from 'react'
import { Box, Typography, Modal, Button, TextField } from '@mui/material';

import Navbar from '../components/Navbar'
import BackButton from '../components/BackButton'
import axiosInstance from '../utils/axiosInstance';

export default function Profile() {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [username, setUsername] = useState('');
    const [tag, setTag] = useState([]);
    const getTag = async () => {
        const response = await axiosInstance.get(`/user/tag`);
        setTag(response.data.data);
    }
    const handleOpen = () => {
        setUsername(data.username);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const getData = async () => {
        try {
            const response = await axiosInstance.get(`/user/profile`);
            setData(response.data.data[0]);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    const updateUsername = async () => {
        try {
            await axiosInstance.put(`/user/updateUsername`, { username });
            handleClose();
            getData();
            window.location.reload();
        } catch (error) {
            console.error('Error updating username:', error);
        }
    };

    useEffect(() => {
        getData();
        getTag();
    }, []);

    return (
        <>
            <Navbar />
            <BackButton />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: '10px'
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Username
                    </Typography>
                    <TextField
                        fullWidth
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button onClick={handleClose} sx={{ mr: 1 }}>Cancel</Button>
                        <Button variant="contained" onClick={updateUsername}>Save</Button>
                    </Box>
                </Box>
            </Modal>
            <Typography sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '40px'
            }}>
                Profile
            </Typography>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                flexDirection: "column",
            }}>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" style={{width: "200px", height: '200px', borderRadius: '100%', marginBottom: '-100px', zIndex: '1',objectFit: 'cover'}}></img>
                <Box sx={{
                    width: '500px',
                    maxWidth: '60%',
                    height: 'auto',
                    boxShadow: '5',
                    backgroundColor: '#FBFEFB',
                    p: '35px 60px',
                    borderRadius: '20px'
                }}>
                    <Typography sx={{
                        pt: "80px",
                        textAlign: 'center',
                        fontSize: '24px',
                        fontWeight: "bold"
                    }}>
                        {data.username}
                    </Typography>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Button disableRipple sx={{
                            pt: "10px",
                            fontSize: '18px',
                            color: '#4169E1',
                            backgroundColor: "transparent",
                            textTransform: 'none',
                            cursor: 'pointer',
                            ":hover": {
                                background: 'transparent',
                                color: "#3159E1"
                            }
                        }} onClick={handleOpen}>
                            Edit Username
                        </Button>
                    </Box>
                    <Box>
                        <Typography sx={{
                            color: '#C9C9C9',
                            pt: "15px"
                        }}>
                            Firstname
                        </Typography>
                        <Typography sx={{
                            color: 'black',
                            pt: "15px",
                            fontSize: '18px'
                        }}>
                            {data.firstname}
                        </Typography>
                        <hr style={{color: 'gray', marginTop: '15px'}}/>
                        <Typography sx={{
                            color: '#C9C9C9',
                            pt: "15px"
                        }}>
                            Lastname
                        </Typography>
                        <Typography sx={{
                            color: 'black',
                            pt: "15px",
                            fontSize: '18px'
                        }}>
                            {data.lastname}
                        </Typography>
                        <hr style={{color: 'gray', marginTop: '15px'}}/>
                        <Typography sx={{
                            color: '#C9C9C9',
                            pt: "15px"
                        }}>
                            Email
                        </Typography>
                        <Typography sx={{
                            color: 'black',
                            pt: "15px",
                            pb: '20px',
                            fontSize: '18px'
                        }}>
                            {data.email}
                        </Typography>
                        <Typography sx={{
                            pb: "20px",
                            color: '#C9C9C9'
                        }}>
                            Tags
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '15px'
                        }}>
                            {tag.map((item) => {
                                return (
                                    <Box sx={{
                                        backgroundColor: "#AF8F6F",
                                        px: "20px",
                                        py: "5px",
                                        color: "#FBFEFB",
                                        fontSize: "16px",
                                        borderRadius: "15px",
                                        
                                    }}>
                                        {item.tag}
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
