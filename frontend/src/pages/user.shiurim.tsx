import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Footer from '../components/footer';
import {
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    useMediaQuery,
    useTheme
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

    return (
        <div>
            <Box sx={{ width: "100%", padding: isMobile ? 2 : 4, minHeight: "100vh" }}>
                <Typography
                    variant={isMobile ? "h5" : "h4"}
                    align="center"
                    gutterBottom
                    sx={{
                        fontWeight: "bold",
                        color: "#2E3B55",
                        marginTop: "35px",
                        marginBottom: "40px",
                        fontFamily: 'Arial, sans-serif',
                    }}
                >
                    שיעורים קבועים
                </Typography>

                <Grid container spacing={3} justifyContent="center">
                    {lessons.map((lesson, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={lesson._id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card
                                    elevation={3}
                                    sx={{
                                        height: 'auto',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        backgroundColor: '#E0F7FA',
                                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
                                        },
                                        margin: 'auto',
                                        padding: '16px',
                                    }}
                                >
                                    <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                                        <Typography variant="h6" component="div" gutterBottom sx={{ color: "#2E3B55", fontWeight: "bold" }}>
                                            {lesson.topic}
                                        </Typography>
                                        <LessonDetailRow icon={<Person />} text={lesson.teacher} />
                                        <LessonDetailRow icon={<AccessTime />} text={lesson.time} />
                                        <LessonDetailRow icon={<CalendarToday />} text={lesson.days} />
                                        <LessonDetailRow icon={<LocationOn />} text={lesson.location} />
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

            </Box>
            <Footer />

        </div>
    );
};

const LessonDetailRow: React.FC<{ icon: React.ReactElement; text: string }> = ({ icon, text }) => (
    <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
        {icon}
        <Typography variant="body2" color="text.secondary" ml={1}>
            {text}
        </Typography>
    </Box>
);

export default React.memo(ShiurimHome);