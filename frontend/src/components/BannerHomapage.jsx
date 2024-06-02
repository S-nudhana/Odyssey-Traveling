import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import background from '../assets/Background.png';
import { Link } from 'react-router-dom';

export default function BannerHomapage() {
    return (
        <Box sx={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
        }}>
            <img
                src={background}
                style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    position: 'absolute',
                    zIndex: -1,
                }}
            />
            <Box sx={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,
                background: "linear-gradient(180deg, rgba(0,0,0,0.5858718487394958) 0%, rgba(0,0,0,0.5550595238095238) 30%, rgba(110,110,110,0.3533788515406162) 60%, rgba(255,255,255,0.4290091036414566) 85%, rgba(255,255,255,1) 110%)",
                color: '#F8F9FA',
            }}>
                <Typography variant = "h3" sx={{
                    pb: '20px',
                    fontSize: {xs: '35px', sm: "50px"},
                    fontWeight: 'bold'
                }}>
                    Come join Us!
                </Typography>
                <Typography sx={{
                    color: '#FBFEFB',
                    pb: '20px',
                    width: {xs: "70%",md:'50%'},
                    textAlign: 'center'
                }}>
                    Discover your next adventure with us! Our website helps travelers find the perfect destination. Whether you're unsure where to go or need inspiration, we provide personalized recommendations just for you.
                </Typography>
                <Link to={`/register`}>
                    <Button disableRipple sx={{
                        textTransform: 'none',
                        backgroundColor: '#4169E1',
                        border: '2px solid transparent',
                        borderRadius: '10px',
                        px: '50px',
                        fontSize: '18px',
                        color: '#F8F9FA',
                        ":hover": {
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            borderColor: '#4169E1',
                            color: '#FBFEFB',
                        }
                    }}>
                        Register
                    </Button>
                </Link>
            </Box>
        </Box>
    );
}