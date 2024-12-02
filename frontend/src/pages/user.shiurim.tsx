import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
} from "@mui/material";

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

    useEffect(() => {
        fetchLessons();
    }, []);

    const fetchLessons = async () => {
        try {
            const response = await axios.get<Lesson[]>("http://localhost:5007/api/lessons");
            setLessons(response.data);
        } catch (error) {
            console.error("Error fetching lessons:", error);
        }
    };

    return (
        <div style={{ width: "100%", padding: 0, margin: 0 }}>
            <Box
                sx={{
                    padding: 4,
                    minHeight: "100vh",
                    width: "100%", // התפשטות של ה-Box על 100% רוחב המסך
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{
                        fontWeight: "bold",
                        color: "#2E3B55",
                        marginBottom: "30px",
                    }}
                >
                    שיעורים קבועים 
                </Typography>
                <TableContainer
                    component={Paper}
                    sx={{
                        width: "100%", // התפשטות של טבלה ל-100% רוחב
                        margin: "auto",
                        boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
                        borderRadius: "12px",
                        overflow: "hidden",
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow
                                sx={{
                                    backgroundColor: "#2E3B55",
                                }}
                            >
                                <TableCell align="center" sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                                    נושא
                                </TableCell>
                                <TableCell align="center" sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                                    הרב המלמד
                                </TableCell>
                                <TableCell align="center" sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                                    שעה
                                </TableCell>
                                <TableCell align="center" sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                                    ימים
                                </TableCell>
                                <TableCell align="center" sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                                    מיקום
                                </TableCell>
                                <TableCell align="center" sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                                    מיועד ל
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lessons.map((lesson) => (
                                <TableRow
                                    key={lesson._id}
                                    sx={{
                                        "&:nth-of-type(odd)": { backgroundColor: "#F7FAFF" },
                                        "&:hover": {
                                            backgroundColor: "#E3E9F5",
                                            transition: "background-color 0.3s",
                                        },
                                    }}
                                >
                                    <TableCell align="center" sx={{ color: "#2E3B55" }}>
                                        {lesson.topic}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: "#2E3B55" }}>
                                        {lesson.teacher}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: "#2E3B55" }}>
                                        {lesson.time}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: "#2E3B55" }}>
                                        {lesson.days}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: "#2E3B55" }}>
                                        {lesson.location}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: "#2E3B55" }}>
                                        {lesson.audience}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
};

export default ShiurimHome;
