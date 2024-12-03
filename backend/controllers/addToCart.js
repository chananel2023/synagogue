// controllers/addToCart.js

import mongoose from 'mongoose';
import { User } from '../models/user.model.js';

const addToCart = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // בדוק אם ה-ID של המשתמש תקין
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send("Invalid user ID");
    }

    // מציאת המשתמש לפי ה-ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // עדכון רשימת המוצרים בעגלה
    products.forEach((product) => {
      const existingProduct = user.cartItems.find(
        (item) => item._id.toString() === product._id
      );

      if (existingProduct) {
        // עדכון כמות המוצר בעגלה
        existingProduct.quantity += product.quantity;
      } else {
        // הוספת המוצר החדש לעגלה
        user.cartItems.push({
          _id: product._id,
          quantity: product.quantity,
        });
      }
    });

    // שמירה למסד נתונים
    await user.save();

    return res.status(200).json(user.cartItems);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error updating cart");
  }
};

const getCart = async (req, res) => {
  console.log('Fetching cart...');
  try {
      const { userId } = req.params;

      // אם ה-ID לא תקין, החזר שגיאה
      if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).send("Invalid user ID");
      }

      // חפש את המשתמש לפי ה-ID
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).send("User not found");
      }

      // החזר את המוצרים בעגלה
      return res.status(200).json(user.cartItems);
  } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error retrieving cart");
  }
};

// ייצוא נפרד לכל פונקציה
export default addToCart;
export { getCart };
