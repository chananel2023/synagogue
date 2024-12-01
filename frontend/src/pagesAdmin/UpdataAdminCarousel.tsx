import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const UpdataAdminCarousel = () => {
  const [slides, setSlides] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '', priority: 0 });
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);

  // פונקציה לשליפת כל התמונות
  const fetchSlides = async () => {
    try {
      const response = await axios.get('http://localhost:5007/api/slides');
      setSlides(response.data);
    } catch (err) {
      console.error('Error fetching slides:', (err as Error).message);
    }
  };

  // פונקציה לטיפול בשינויי ערכים בטופס
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // פונקציה ליצירת תמונה חדשה
  const handleCreateSlide = async () => {
    try {
      const response = await axios.post('http://localhost:5007/api/slides', form);
      console.log('Slide added:', response.data); // הדפסת הפריט בקונסול
      fetchSlides();
      setForm({ title: '', description: '', imageUrl: '', priority: 0 });
    } catch (err) {
      console.error('Error creating slide:', (err as Error).message);
    }
  };

  // פונקציה למחיקת תמונה
  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:5007/api/slides/${id}`);
      console.log('Slide deleted:', response.data);
      fetchSlides(); // עדכון הרשימה לאחר מחיקת התמונה
    } catch (err) {
      console.error('Error deleting slide:', (err as Error).message);
    }
  };

  // פונקציה לעדכון תמונה
  const handleUpdateSlide = async () => {
    if (editingSlideId) {
      try {
        const response = await axios.put(`http://localhost:5007/api/slides/${editingSlideId}`, form);
        console.log('Slide updated:', response.data);
        fetchSlides();
        setForm({ title: '', description: '', imageUrl: '', priority: 0 });
        setEditingSlideId(null);
      } catch (err) {
        console.error('Error updating slide:', (err as Error).message);
      }
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  return (
    <div>
      <h1>Manage Slides</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleInputChange}
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleInputChange}
        />
        <input
          name="priority"
          type="number"
          placeholder="Priority"
          value={form.priority}
          onChange={handleInputChange}
        />
        <button type="button" onClick={editingSlideId ? handleUpdateSlide : handleCreateSlide}>
          {editingSlideId ? 'Update Slide' : 'Add Slide'}
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {slides.map((slide: any) => (
            <tr key={slide._id}>
              <td>{slide.title}</td>
              <td>{slide.description}</td>
              <td>
                <img src={slide.imageUrl} alt={slide.title} width="100" />
              </td>
              <td>{slide.priority}</td>
              <td>
                <button className="edit" onClick={() => {
                  setForm({
                    title: slide.title,
                    description: slide.description,
                    imageUrl: slide.imageUrl,
                    priority: slide.priority
                  });
                  setEditingSlideId(slide._id);
                }}>
                  Edit
                </button>
                <button className="delete" onClick={() => handleDelete(slide._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdataAdminCarousel;
