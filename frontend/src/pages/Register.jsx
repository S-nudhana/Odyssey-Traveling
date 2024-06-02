import React, { useState } from 'react'
import { Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, } from "@mui/material";
import { Link, ScrollRestoration } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../utils/axiosInstance';

import logo from "../assets/logoBlack.jpeg"

import BackButton from '../components/BackButton';

export default function Register() {
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        checkpassword: "",
    });

    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleFirstName = (Vaule) => {
        setForm({ ...form, firstname: Vaule });
    };
    const handleLastName = (Vaule) => {
        setForm({ ...form, lastname: Vaule });
    };
    const handleUserName = (Vaule) => {
        setForm({ ...form, username: Vaule })
    };
    const handleEmail = (Vaule) => {
        setForm({ ...form, email: Vaule })
    };
    const handlePassword = (Vaule) => {
        setForm({ ...form, password: Vaule })
    };
    const handleCheckPassword = (Vaule) => {
        setForm({ ...form, checkpassword: Vaule })
    };
    const navigate = useNavigate();
    const handleSignUp = async () => {
        try {
            const response = await axiosInstance.post("/auth/register", {
                username: form.username,
                password: form.password,
                firstname: form.firstname,
                lastname: form.lastname,
                email: form.email,
            });
            if (response.status === 200) {
                setOpenSuccessDialog(true);
                setTimeout(() => {
                    navigate("/preference");
                }, 2000);
            }
        } catch (error) {
            console.error("Error signing up:", error);

            setOpenErrorDialog(true);
            setErrorMessage(
                "An error occurred during registration. Please try again."
            );
        }
    };
    const handleCloseSuccessDialog = () => {
        setOpenSuccessDialog(false);
    };
    const handleCloseErrorDialog = () => {
        setOpenErrorDialog(false);
    };
    return (
        <>
        <ScrollRestoration/>
            <Box sx={{
                mt: "-80px"
            }}>
                <BackButton/>
            </Box>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100vw",
                flexDirection: "column",
                py: '150px'
            }}>
                <Dialog open={openSuccessDialog} onClose={handleCloseSuccessDialog}>
                    <DialogTitle>Registration Successful</DialogTitle>
                    <DialogContent>
                        <Typography>Please Login</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseSuccessDialog}>OK</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openErrorDialog} onClose={handleCloseErrorDialog}>
                    <DialogTitle>Error</DialogTitle>
                    <DialogContent>
                        <Typography>{errorMessage}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseErrorDialog}>OK</Button>
                    </DialogActions>
                </Dialog>
                <Box sx={{
                    width: '500px',
                    maxWidth: '60%',
                    height: 'auto',
                    boxShadow: '5',
                    backgroundColor: '#FBFEFB',
                    p: '35px 60px',
                    borderRadius: '20px'
                }}>
                    <center><img src={logo} style={{height: '150px'}}></img></center>
                    <Typography variant = "h6" sx={{
                        textAlign: 'center',
                        fontWeight: '600',
                        color: '#545454'
                    }}>
                        Register
                    </Typography>
                    <Box sx={{
                        width: '100%',
                        pt: '25px',
                        // gap: '9px'
                    }}>
                        <TextField
                            sx={{
                                mb: '18px'
                            }}
                            id="outlined-basic" 
                            label="Firstname" 
                            variant="outlined"
                            error={form.firstname === ""}
                            helperText={
                                !form.firstname ? "Please enter your Firstname" : ""
                            }
                            onChange={(item) => handleFirstName(item.target.value)}
                            fullWidth     
                        />
                        <TextField
                            sx={{
                                mb: '18px'
                            }}
                            id="outlined-basic" 
                            label="Lastname" 
                            variant="outlined"
                            error={form.lastname === ""}
                            helperText={
                                !form.lastname ? "Please enter your Lastname" : ""
                            }
                            onChange={(item) => handleLastName(item.target.value)}
                            fullWidth     
                        />
                        <TextField
                            sx={{
                                mb: '18px'
                            }}
                            id="outlined-basic" 
                            label="Email" 
                            variant="outlined"
                            error={form.email === "" || !emailRegex.test(form.email)}
                            helperText={
                                !form.email
                                  ? "Please enter your Email"
                                  : !emailRegex.test(form.email)
                                  ? "Please enter a valid Email address."
                                  : ""
                            }
                            onChange={(item) => handleEmail(item.target.value)}
                            fullWidth     
                        />
                        <TextField
                            sx={{
                                mb: '18px'
                            }}
                            id="outlined-basic" 
                            label="Username" 
                            variant="outlined"
                            error={form.username === ""}
                            helperText={
                                !form.username ? "Please enter your Username" : ""
                            }
                            onChange={(item) => handleUserName(item.target.value)}
                            fullWidth     
                        />
                        <TextField
                            sx={{
                                mb: '18px'
                            }}
                            id="outlined-basic" 
                            label="Password" 
                            variant="outlined"
                            type='password'
                            error={form.password === ""}
                            helperText={
                                !form.password ? "Please enter your Password" : ""
                            }
                            onChange={(item) => handlePassword(item.target.value)}
                            fullWidth     
                        />
                        <TextField
                            sx={{
                                mb: '18px'
                            }}
                            id="outlined-basic" 
                            label="Confirm Password" 
                            type='password'
                            variant="outlined"
                            error={form.checkpassword !== form.password || form.checkpassword === ""}
                            helperText={
                                !form.checkpassword ? "Please enter your Password" : form.checkpassword !== form.password ? "Password does't match": ""
                            }
                            onChange={(item) => handleCheckPassword(item.target.value)}
                            fullWidth     
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
                                Already have account?
                            </Typography>
                            <Link to={`/signIn`} style={{ textDecoration: 'none' }}>
                                <Typography sx={{
                                    color: "#4169E1",
                                    ":hover": {
                                        cursor: "pointer",
                                        textDecoration: "underline",
                                        textUnderlineOffset: '2px'
                                    },
                                }}
                                >
                                    Sign in
                                </Typography>
                            </Link>
                        </Box>
                        <Button 
                            variant="contained"
                            disabled={
                                form.username === "" ||
                                form.lastname === "" ||
                                form.email === "" ||
                                !emailRegex.test(form.email) ||
                                form.username === "" ||
                                form.password === ""||
                                form.checkpassword !== form.password
                            }
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
                            onClick={handleSignUp}
                        >
                            Sign up
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}