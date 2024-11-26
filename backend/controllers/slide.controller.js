import Slide from '../models/Slide.model.js';

export const getSlides = async (req, res) => {
    try {
        const slides = await Slide.find().sort({ priority: 1 });
        res.json(slides);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createSlide = async (req, res) => {
    const slide = new Slide(req.body);
    try {
        const newSlide = await slide.save();
        res.status(201).json(newSlide);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateSlide = async (req, res) => {
    try {
        const updatedSlide = await Slide.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedSlide);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteSlide = async (req, res) => {
    try {
        await Slide.findByIdAndDelete(req.params.id);
        res.json({ message: 'Slide deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
