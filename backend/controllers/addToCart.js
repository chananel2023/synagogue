// controllers/addToCart.js

import mongoose from 'mongoose';
import { User } from '../models/user.model.js';

const addToCart = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // בדיקת תקינות המידע
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    if (!Array.isArray(products) || products.some(p => !p._id || !p.quantity || !p.price)) {
      return res.status(400).json({ error: "Invalid products data" });
    }

    // מציאת המשתמש
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // עדכון עגלת הקניות
    products.forEach((product) => {
      const existingProduct = user.cartItems.find(
        (item) => item._id.toString() === product._id
      );

      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        user.cartItems.push({
          _id: product._id,
          quantity: product.quantity,
          price: product.price,
        });
      }
    });

    // שמירה למסד נתונים
    await user.save();

    return res.status(200).json({ cartItems: user.cartItems });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error updating cart" });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ cartItems: user.cartItems });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error retrieving cart" });
  }
};

// ייצוא
export default addToCart;
export { getCart };
