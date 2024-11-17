import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Container, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { log } from 'console';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password ) {
            
            alert('Please enter both username and password.');
            return;
        }
        if (!email.trim() || !password.trim()) {
            
            alert('Please enter both username and password.');
            return;
        }
        

        try {
            console.log('Sending data:', { email, password });

            const response = await axios.post('http://localhost:5007/api/auth/login', {
                email,
                password,
            }, { withCredentials: true }); // Sending cookies

            console.log('Login successful:', response.data);
            if (response.status === 200) {
                alert('Login successful!');
                navigate("/homePage");
            } else {
                alert('Login failed.');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                alert('Login failed: ' + error.response.data.message);
            } else {
                alert('An unexpected error occurred.');
            }
            console.error('Error connecting to the server:', error);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 1 }}
                        onClick={() => navigate('/signup')}
                    >
                        Create Account
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
