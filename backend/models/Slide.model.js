import mongoose from 'mongoose';

const SlideSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
    displayTime: { type: Number, required: true, default: 5 },
    priority: { type: Number, default: 1 }
});

export default mongoose.model('Slide', SlideSchema);
