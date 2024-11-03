import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Container, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
const Login: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [initialData, setInitialData] = useState(null); // For fetched data
    const [error, setError] = useState(null);
    const [validationError, setValidationError] = useState('');

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await axios.get('http://localhost:5007/api/auth/login');
                setInitialData(response.data);
                console.log('Initial data fetched:', response.data);
            } catch (err) {
                console.error('Error fetching initial data:', err);
                // setError('Failed to load initial data');
            }
        };

        fetchInitialData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5007/api/auth/login', {
                username,
                password,
            });
            console.log('Login successful:', response.data);

            if (response.status === 200) {
                alert('Login successful!');
                navigate("/home");
            } else {
                alert('Login failed.');
            }
        } catch (error) {
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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
