import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    teacher: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    time: {
        type: String, 
        required: true,
    },
    days: {
        type: [String], 
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    audience: {
        type: String, 
        required: true,
    },
});

const Lesson = mongoose.model('Lesson', lessonSchema);
export default Lesson;
