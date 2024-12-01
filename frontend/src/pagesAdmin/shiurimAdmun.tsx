import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Modal,
    Container,
    TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Lesson {
    _id: string;
    topic: string;
    teacher: string;
    time: string;
    days: string;
    location: string;
    audience: string;
}

const ShiurimAdmin: React.FC = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
    const [teacher, setTeacher] = useState<string>("");
    const [topic, setTopic] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [days, setDays] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [audience, setAudience] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        getLessons();
    }, []);

    const getLessons = async () => {
        try {
            const response = await axios.get("http://localhost:5007/api/lessons");
            setLessons(response.data);
        } catch (error) {
            console.error("Error fetching lessons:", error);
        }
    };

    const handleCreateOrUpdate = async () => {
        try {
            const newLesson = { topic, teacher, time, days, location, audience };

            if (currentLessonId) {
                await axios.put(`http://localhost:5007/api/lessons/${currentLessonId}`, newLesson);
            } else {
                await axios.post("http://localhost:5007/api/lessons", newLesson);
            }

            getLessons();
            resetForm();
            setIsModalOpen(false); // סגירת המודל אחרי שמירת שיעור
        } catch (error) {
            console.error("Error creating/updating lesson:", error);
        }
    };

    const deleteLesson = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5007/api/lessons/${id}`);
            getLessons();
        } catch (error) {
            console.error("Error deleting lesson:", error);
        }
    };

    const resetForm = () => {
        setTeacher("");
        setTopic("");
        setTime("");
        setDays("");
        setLocation("");
        setAudience("");
        setCurrentLessonId(null);
    };

    return (
        <Container
            sx={{
                width: "100%",
                minHeight: "100vh",
                padding: 4,
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Box textAlign="center" mb={2}>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/homePage")}
                        sx={{
                            backgroundColor: "#1976d2", // צבע כפתור
                            color: "#fff",
                            fontWeight: "bold",
                            "&:hover": { backgroundColor: "#1565c0" },
                        }}
                    >
                        חזור לדשבורד
                    </Button>
                </Box>

                <Typography
                    variant="h3"
                    align="center"
                    gutterBottom
                    sx={{
                        fontFamily: "Arial, sans-serif",
                        fontWeight: "bold",
                    }}
                >
                    שיעורים באתר
                </Typography>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <Box textAlign="center" mb={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setIsModalOpen(true)}
                        sx={{
                            backgroundColor: "#4CAF50",
                            fontWeight: "bold",
                            padding: "10px 20px",
                            borderRadius: "30px",
                            "&:hover": { backgroundColor: "#45A049" },
                        }}
                    >
                        הוסף שיעור חדש
                    </Button>
                </Box>
            </motion.div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            staggerChildren: 0.3,
                        },
                    },
                }}
                style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20 }}
            >
                {lessons.map((lesson) => (
                    <motion.div
                        key={lesson._id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card
                            sx={{
                                width: "300px",
                                backgroundColor: "white",
                                borderRadius: "10px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                transition: "transform 0.3s",
                                "&:hover": { transform: "scale(1.05)" },
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" sx={{ color: "#333", fontWeight: "bold" }}>
                                    {lesson.topic}
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    הרב המלמד: {lesson.teacher}
                                </Typography>
                                <Typography variant="body2">שעה: {lesson.time}</Typography>
                                <Typography variant="body2">הימים: {lesson.days}</Typography>
                                <Typography variant="body2">מיקום: {lesson.location}</Typography>
                                <Typography variant="body2">מיועד ל: {lesson.audience}</Typography>

                                <Box mt={2} display="flex" justifyContent="space-around">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            setTeacher(lesson.teacher);
                                            setTopic(lesson.topic);
                                            setTime(lesson.time);
                                            setDays(lesson.days);
                                            setLocation(lesson.location);
                                            setAudience(lesson.audience);
                                            setCurrentLessonId(lesson._id);
                                            setIsModalOpen(true);
                                        }}
                                    >
                                        ערוך
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => deleteLesson(lesson._id)}
                                    >
                                        מחק
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        backgroundColor: "white",
                        padding: 4,
                        boxShadow: 24,
                        borderRadius: 4,
                    }}
                >
                    <Typography id="modal-title" variant="h6" sx={{ mb: 2 }}>
                        {currentLessonId ? "ערוך שיעור" : "הוסף שיעור"}
                    </Typography>
                    <TextField
                        label="נושא"
                        variant="outlined"
                        fullWidth
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="רב המלמד"
                        variant="outlined"
                        fullWidth
                        value={teacher}
                        onChange={(e) => setTeacher(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="שעה"
                        variant="outlined"
                        fullWidth
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="ימים"
                        variant="outlined"
                        fullWidth
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="מיקום"
                        variant="outlined"
                        fullWidth
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="מיועד ל"
                        variant="outlined"
                        fullWidth
                        value={audience}
                        onChange={(e) => setAudience(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Box textAlign="center" mt={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCreateOrUpdate}
                            sx={{
                                backgroundColor: "#1976d2",
                                color: "#fff",
                                fontWeight: "bold",
                                "&:hover": { backgroundColor: "#1565c0" },
                            }}
                        >
                            {currentLessonId ? "עדכן שיעור" : "הוסף שיעור"}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export default ShiurimAdmin;
