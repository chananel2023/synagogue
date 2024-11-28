import Lesson from '../models/shiurim.model.js';

// יצירת שיעור חדש
export const createLesson = async (req, res) => {
    try {
        const { teacher, topic, time, days, location, audience } = req.body;
        const newLesson = new Lesson({ teacher, topic, time, days, location, audience });
        await newLesson.save();
        res.status(201).json({ message: 'שיעור נוצר בהצלחה!', lesson: newLesson });
    } catch (error) {
        res.status(500).json({ message: 'שגיאה ביצירת השיעור', error });
    }
};

// קבלת כל השיעורים
export const getAllLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find();
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בקבלת השיעורים', error });
    }
};

// עדכון שיעור
export const updateLesson = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedLesson = await Lesson.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedLesson) {
            return res.status(404).json({ message: 'שיעור לא נמצא' });
        }
        res.status(200).json({ message: 'שיעור עודכן בהצלחה!', lesson: updatedLesson });
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בעדכון השיעור', error });
    }
};

// מחיקת שיעור
export const deleteLesson = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedLesson = await Lesson.findByIdAndDelete(id);
        if (!deletedLesson) {
            return res.status(404).json({ message: 'שיעור לא נמצא' });
        }
        res.status(200).json({ message: 'שיעור נמחק בהצלחה!', lesson: deletedLesson });
    } catch (error) {
        res.status(500).json({ message: 'שגיאה במחיקת השיעור', error });
    }
};
