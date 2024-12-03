import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Footer from '../components/Footer'

import {
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { AccessTime, CalendarToday, LocationOn, Person, School } from "@mui/icons-material";
import { motion } from 'framer-motion';

interface Lesson {
    _id: string;
    topic: string;
    teacher: string;
    time: string;
    days: string;
    location: string;
    audience: string;
}

const ShiurimHome: React.FC = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const fetchLessons = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get<Lesson[]>("http://localhost:5007/api/lessons");
            setLessons(response.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching lessons:", error);
            setError("Failed to load lessons. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLessons();
    }, [fetchLessons]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    // קביעת מספר העמודות בהתאם למספר השיעורים
    const columnsPerRow = lessons.length <= 4 ? 4 : 3;

    return (
        <Box sx={{ width: "100%", padding: isMobile ? 2 : 4, minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
            <Typography
                variant={isMobile ? "h5" : "h4"}
                align="center"
                gutterBottom
                sx={{
                    fontWeight: "bold",
                    color: "#2E3B55",
                    marginTop: "60px",
                    marginBottom: "40px",
                    fontFamily: 'Arial, sans-serif', // פונט אריאל
                }}
            >
                שיעורים קבועים
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {lessons.map((lesson, index) => (
                    <Grid item xs={12} sm={6} md={12 / columnsPerRow} key={lesson._id}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} // התחלה לא שקופה ומעט למטה
                            animate={{ opacity: 1, y: 0 }} // שקיפות מלאה ומיקום רגיל
                            transition={{ duration: 0.5, delay: index * 0.1 }} // עיכוב לפי אינדקס
                        >
                            <Card
                                elevation={3}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
                                    },
                                }}
                            >
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6" component="div" gutterBottom sx={{ color: "#2E3B55", fontWeight: "bold" }}>
                                        {lesson.topic}
                                    </Typography>
                                    <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
                                        <Person sx={{ marginRight: 1, color: "#2E3B55" }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {lesson.teacher}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
                                        <AccessTime sx={{ marginRight: 1, color: "#2E3B55" }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {lesson.time}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
                                        <CalendarToday sx={{ marginRight: 1, color: "#2E3B55" }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {lesson.days}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
                                        <LocationOn sx={{ marginRight: 1, color: "#2E3B55" }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {lesson.location}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
                                        <School sx={{ marginRight: 1, color: "#2E3B55" }} />
                                        <Chip
                                            label={lesson.audience}
                                            size="small"
                                            sx={{
                                                backgroundColor: "#E3E9F5",
                                                color: "#2E3B55",
                                                fontWeight: "bold"
                                            }}
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
            <Footer />

        </Box>
    );
};

export default React.memo(ShiurimHome);

