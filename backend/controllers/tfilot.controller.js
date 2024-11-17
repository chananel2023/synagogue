import Tfilot from '../models/tfilot.model.js';

// יצירת תפילה חדשה
const createTfila = async (req, res) => {
    try {
        const { tfila, time } = req.body;
        const newTfila = new Tfilot({ tfila, time });
        const savedTfila = await newTfila.save();
        res.status(201).json(savedTfila);
    } catch (error) {
        res.status(500).json({ message: 'שגיאה ביצירת תפילה חדשה', error });
    }
};

// קריאת כל התפילות
const getTfilot = async (req, res) => {
    try {
        const tfilot = await Tfilot.find();
        res.status(200).json(tfilot);
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בקריאת התפילות', error });
    }
};

// עדכון תפילה לפי ID
const updateTfila = async (req, res) => {
    try {
        const { id } = req.params;
        const { tfila, time } = req.body;
        const updatedTfila = await Tfilot.findByIdAndUpdate(
            id,
            { tfila, time },
            { new: true }
        );
        if (!updatedTfila) {
            return res.status(404).json({ message: 'תפילה לא נמצאה' });
        }
        res.status(200).json(updatedTfila);
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בעדכון התפילה', error });
    }
};

// מחיקת תפילה לפי ID
const deleteTfila = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTfila = await Tfilot.findByIdAndDelete(id);
        if (!deletedTfila) {
            return res.status(404).json({ message: 'תפילה לא נמצאה' });
        }
        res.status(200).json({ message: 'התפילה נמחקה בהצלחה' });
    } catch (error) {
        res.status(500).json({ message: 'שגיאה במחיקת התפילה', error });
    }
};

export {
    createTfila,
    getTfilot,
    updateTfila,
    deleteTfila
};
