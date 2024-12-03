import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Modal,
  Box
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

interface Slide {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  priority: number;
}

const UpdataAdminCarousel: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '', priority: 0 });
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await axios.get('http://localhost:5007/api/slides');
      setSlides(response.data);
    } catch (err) {
      console.error('שגיאה בטעינת התמונות:', (err as Error).message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCreateSlide = async () => {
    try {
      await axios.post('http://localhost:5007/api/slides', form);
      fetchSlides();
      setForm({ title: '', description: '', imageUrl: '', priority: 0 });
      setIsModalOpen(false);
    } catch (err) {
      console.error('שגיאה ביצירת תמונה:', (err as Error).message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5007/api/slides/${id}`);
      fetchSlides();
    } catch (err) {
      console.error('שגיאה במחיקת תמונה:', (err as Error).message);
    }
  };

  const handleUpdateSlide = async () => {
    if (editingSlideId) {
      try {
        await axios.put(`http://localhost:5007/api/slides/${editingSlideId}`, form);
        fetchSlides();
        setForm({ title: '', description: '', imageUrl: '', priority: 0 });
        setEditingSlideId(null);
        setIsModalOpen(false);
      } catch (err) {
        console.error('שגיאה בעדכון תמונה:', (err as Error).message);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        ניהול קרוסלה
      </Typography>

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => setIsModalOpen(true)}
        sx={{ mb: 3 }}
      >
        הוסף תמונה חדשה
      </Button>

      <Grid container spacing={3}>
        {slides.map((slide) => (
          <Grid item xs={12} sm={6} md={4} key={slide._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant="h6">{slide.title}</Typography>
                <Typography variant="body2" color="text.secondary">{slide.description}</Typography>
                <img src={slide.imageUrl} alt={slide.title} style={{ width: '100%', marginTop: '10px' }} />
                <Typography variant="body2" color="text.secondary">עדיפות: {slide.priority}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  startIcon={<Edit />}
                  onClick={() => {
                    setForm(slide);
                    setEditingSlideId(slide._id);
                    setIsModalOpen(true);
                  }}
                >
                  ערוך
                </Button>
                <Button
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleDelete(slide._id)}
                >
                  מחק
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

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
        }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {editingSlideId ? 'ערוך תמונה' : 'הוסף תמונה חדשה'}
          </Typography>
          <TextField
            fullWidth
            label="כותרת"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="תיאור"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="כתובת תמונה"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="עדיפות"
            name="priority"
            type="number"
            value={form.priority}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={editingSlideId ? handleUpdateSlide : handleCreateSlide}
          >
            {editingSlideId ? 'עדכן תמונה' : 'הוסף תמונה'}
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default UpdataAdminCarousel;