import React, { useState, useEffect } from "react";
import Footer from '../components/footer'

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
    <div>
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                זמני שיעורים
            </Typography>
            <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">נושא</TableCell>
                            <TableCell align="center">הרב המלמד</TableCell>
                            <TableCell align="center">שעה</TableCell>
                            <TableCell align="center">ימים</TableCell>
                            <TableCell align="center">מיקום</TableCell>
                            <TableCell align="center">מיועד ל</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lessons.map((lesson) => (
                            <TableRow key={lesson._id}>
                                <TableCell align="center">{lesson.topic}</TableCell>
                                <TableCell align="center">{lesson.teacher}</TableCell>
                                <TableCell align="center">{lesson.time}</TableCell>
                                <TableCell align="center">{lesson.days}</TableCell>
                                <TableCell align="center">{lesson.location}</TableCell>
                                <TableCell align="center">{lesson.audience}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Box>
            <Footer />
        </div>
    );
};

export default ShiurimHome;
