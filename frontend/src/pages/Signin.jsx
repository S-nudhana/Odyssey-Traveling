import React, { useState } from 'react'
import { Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, } from "@mui/material";
import { Link, ScrollRestoration } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Cookies from "js-cookie";

import logo from "../assets/logoBlack.jpeg"

import BackButton from '../components/BackButton';

export default function SignIn() {
    const [userName, setUsername] = useState("");
    const [passWord, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async () => {
        if (userName !== "" && passWord !== "") {
            try {
                const response = await axiosInstance.post("/auth/login", {
                    username: userName,
                    password: passWord,
                });
                if (response.status === 200) {
                    Cookies.set("token", response.data.token, {
                        expires: 7,
                        secure: true,
                    });
                    navigate("/");
                }
            } catch (error) {
                console.log(error.response.status);
                if (error.response.status === 400) {
                    setOpen(true);
                }
            }
        }
    };
    const [open, setOpen] = useState(false);

    return (
        <>
        <ScrollRestoration/>
            <Box sx={{
                mt: "-80px"
            }}>
                <BackButton />
            </Box>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <Typography>The username or password is incorrect.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>OK</Button>
                </DialogActions>
            </Dialog>
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
                    <center><img src={logo} style={{ height: '150px' }}></img></center>
                    <Typography variant="h6" sx={{
                        textAlign: 'center',
                        fontWeight: '600',
                        color: '#545454'
                    }}>
                        Sign In
                    </Typography>
                    <Box sx={{
                        width: '100%',
                        pt: '25px',
                    }}>
                        <TextField sx={{
                            mb: '18px'
                        }}
                            id="outlined-basic"
                            label="Username"
                            variant="outlined"
                            error={!userName}
                            helperText={!userName ? "Please enter your Username" : ""}
                            onChange={(user_name) => setUsername(user_name.target.value)} fullWidth
                        />
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            type='password'
                            variant="outlined"
                            error={!passWord}
                            helperText={!passWord ? "Please enter your Password" : ""}
                            onChange={(user_password) => setPassword(user_password.target.value)} fullWidth
                        />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mt: '10px',
                    }}>
                        <Box sx={{
                            display: 'flex',
                            pb: '20px',
                            gap: '5px'
                        }}>
                            <Typography sx={{
                                color: 'gray'
                            }}>
                                Don't have account?
                            </Typography>
                            <Link to={`/register`} style={{ textDecoration: 'none' }}>
                                <Typography sx={{
                                    color: "#4169E1",
                                    ":hover": {
                                        cursor: "pointer",
                                        textDecoration: "underline",
                                        textUnderlineOffset: '2px'
                                    },
                                }}
                                >
                                    Register
                                </Typography>
                            </Link>
                        </Box>
                        <Button
                            variant="contained"
                            disableRipple
                            disabled={userName === "" || passWord === ""}
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
                            onClick={handleSubmit}
                        >
                            Login
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}