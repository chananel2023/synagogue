import React, { useState, useEffect, useMemo } from "react";
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
    IconButton,
} from "@mui/material";
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Schedule as ScheduleIcon,
} from '@mui/icons-material';

interface Tfila {
    _id: string;
    tfila: string;
    time: string;
}

const AdminTfilot: React.FC = () => {
    const [tfilot, setTfilot] = useState<Tfila[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [newTfila, setNewTfila] = useState<{ tfila: string; time: string }>({ tfila: "", time: "" });
    const [editingTfila, setEditingTfila] = useState<Tfila | null>(null);
    const [message, setMessage] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const memoizedTfilot = useMemo(() => tfilot, [tfilot]);

    useEffect(() => {
        fetchTfilot();
    }, []);

    const fetchTfilot = async () => {
        try {
            const response = await axios.get("http://localhost:5007/api/tfilot");
            setTfilot(response.data);
            setLoading(false);
        } catch (error) {
            setMessage("שגיאה בטעינת התפילות");
            setLoading(false);
        }
    };

    const handleCreateTfila = async () => {
        try {
            const response = await axios.post("http://localhost:5007/api/tfilot", newTfila);
            setTfilot([response.data, ...tfilot]);
            setNewTfila({ tfila: "", time: "" });
            setMessage("התפילה נוספה בהצלחה");
            setIsModalOpen(false);
        } catch (error) {
            setMessage("שגיאה בהוספת תפילה");
        }
    };

    const handleDeleteTfila = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5007/api/tfilot/${id}`);
            setTfilot(tfilot.filter((tfila) => tfila._id !== id));
            setMessage("התפילה נמחקה בהצלחה");
        } catch (error) {
            setMessage("שגיאה במחיקת תפילה");
        }
    };

    const handleUpdateTfila = async () => {
        if (editingTfila) {
            try {
                const response = await axios.put(
                    `http://localhost:5007/api/tfilot/${editingTfila._id}`,
                    { tfila: editingTfila.tfila, time: editingTfila.time }
                );
                setTfilot(tfilot.map((tfila) => (tfila._id === response.data._id ? response.data : tfila)));
                setEditingTfila(null);
                setMessage("התפילה עודכנה בהצלחה");
                setIsModalOpen(false);
            } catch (error) {
                setMessage("שגיאה בעדכון תפילה");
            }
        }
    };

    const handleEditTfila = (tfila: Tfila) => {
        setEditingTfila({ ...tfila });
        setIsModalOpen(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (editingTfila) {
            setEditingTfila({ ...editingTfila, [name]: value });
        } else {
            setNewTfila({ ...newTfila, [name]: value });
        }
    };

    return (
        <Container maxWidth="lg">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
                    ניהול זמני תפילות
                </Typography>

                {message && (
                    <Box sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
                        <Typography color="primary">{message}</Typography>
                    </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setIsModalOpen(true)}
                        sx={{ borderRadius: 28 }}
                    >
                        הוסף תפילה חדשה
                    </Button>
                </Box>

                {loading ? (
                    <Typography align="center">טוען תפילות...</Typography>
                ) : (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                        {memoizedTfilot.map((tfila) => (
                            <Card key={tfila._id} sx={{ width: 300, borderRadius: 2, boxShadow: 3 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {tfila.tfila}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        <ScheduleIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                        {tfila.time}
                                    </Typography>
                                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                        <IconButton onClick={() => handleEditTfila(tfila)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteTfila(tfila._id)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}
            </motion.div>

            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}>
                    <Typography variant="h6" gutterBottom>
                        {editingTfila ? 'עריכת תפילה' : 'הוספת תפילה חדשה'}
                    </Typography>
                    <TextField
                        fullWidth
                        label="שם התפילה"
                        name="tfila"
                        value={editingTfila ? editingTfila.tfila : newTfila.tfila}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="זמן התפילה"
                        name="time"
                        type="time"
                        value={editingTfila ? editingTfila.time : newTfila.time}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={editingTfila ? handleUpdateTfila : handleCreateTfila}
                        sx={{ mt: 2 }}
                    >
                        {editingTfila ? 'עדכן תפילה' : 'הוסף תפילה'}
                    </Button>
                </Box>
            </Modal>
        </Container>
    );
};

export default AdminTfilot;