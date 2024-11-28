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
        type: String, // בפורמט HH:mm
        required: true,
    },
    days: {
        type: [String], // לדוגמה: ["Sunday", "Monday"]
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    audience: {
        type: String, // לדוגמה: "Men", "Women", "Children"
        required: true,
    },
});

const Lesson = mongoose.model('Lesson', lessonSchema);
export default Lesson;
