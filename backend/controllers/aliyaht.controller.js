import dotenv from 'dotenv';
dotenv.config();
import { TorahAliyah } from "../models/TorahAliyah.model.js";
import { User } from "../models/user.model.js";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const addAliyahToUser = async (req, res) => {
    const { userId, aliyahDetails } = req.body;

    if (!userId || !aliyahDetails || !aliyahDetails.buyer || !aliyahDetails.date) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields (userId, buyer, or date)"
        });
    }

    try {
        // מציאת המשתמש לפי ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // יצירת העלייה החדשה ושמירתה ב-DB
        const newAliyah = { quantity: 1, ...aliyahDetails };




        user.TorahAliyah.push(newAliyah);
        await user.save();

        res.status(201).json({
            success: true,
            message: "Aliyah added successfully",
            aliyah: newAliyah,
            user,
        });
    } catch (error) {
        console.error("Error in addAliyahToUser:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const markAliyahAsPaid = async (req, res) => {
    const { userId, aliyahId, stripePaymentId } = req.body;

    try {
        // מציאת המשתמש לפי ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // מציאת העלייה לפי ID בתוך המערך
        const aliyah = user.TorahAliyah.find((aliyah) => aliyah._id.toString() === aliyahId);
        if (!aliyah) {
            return res.status(404).json({ success: false, message: "Aliyah not found" });
        }

        // סימון העלייה כמשולמת
        aliyah.isPaid = true;
        aliyah.paymentId = stripePaymentId;

        // שמירת השינויים במשתמש
        await user.save();

        res.status(200).json({
            success: true,
            message: "Aliyah marked as paid",
            aliyah,
        });
    } catch (error) {
        console.error("Error in markAliyahAsPaid:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const deleteAliyah = async (req, res) => {
    const { userId, aliyahId } = req.body;

    try {
        // בדיקה אם המשתמש קיים
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // מחיקת העלייה מרשימת ה-TorahAliyah של המשתמש
        const aliyahIndex = user.TorahAliyah.findIndex((aliyah) => aliyah._id.toString() === aliyahId);
        if (aliyahIndex !== -1) {
            user.TorahAliyah.splice(aliyahIndex, 1);
            await user.save();
        } else {
            return res.status(404).json({ success: false, message: "Aliyah not found in user's TorahAliyah" });
        }




        res.status(200).json({
            success: true,
            message: "Aliyah deleted successfully",
        });
    } catch (error) {
        console.error("Error in deleteAliyah:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const fetchUserAliyah = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            return { success: false, status: 404, message: "User not found" };
        }

        const userTorahAliyah = user.TorahAliyah;
        if (!userTorahAliyah || userTorahAliyah.length === 0) {
            return { success: false, status: 404, message: "No Torah aliyah records found" };
        }

        return { success: true, status: 200, data: { userTorahAliyah } };
    } catch (error) {
        console.error("Error fetching user aliyah: ", error);
        return { success: false, status: 500, message: "Server error" };
    }
};

export const getUserAliyah = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const result = await fetchUserAliyah(userId);
    return res.status(result.status).json(result);
};
export const getAllUsersAliyah = async (req, res) => {
    try {
        // שליפת כל המשתמשים
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ success: false, message: "No users found" });
        }

        // יצירת רשימת העליות לכל המשתמשים
        const allUsersAliyah = await Promise.all(
            users.map(async (user) => {
                // שליפת העליות של המשתמש
                const result = await fetchUserAliyah(user._id);

                // בדיקה אם הקריאה הצליחה
                if (!result.success) {
                    return { userId: user._id, aliyahDetails: [], sum: 0 };
                }

                const aliyahDetails = result.data.userTorahAliyah || [];

                // חישוב הסכום
                const { paidSum, unpaidSum } = aliyahDetails.reduce(
                    (totals, aliyah) => {
                        if (aliyah.isPaid) {
                            totals.paidSum += aliyah.price || 0;
                        } else {
                            totals.unpaidSum += aliyah.price || 0;
                        }
                        return totals;
                    },
                    { paidSum: 0, unpaidSum: 0 } // ערכי התחלה
                );


                // החזרת המידע
                return { userId: user._id, aliyahDetails, paidSum, unpaidSum, name: user.name };
            })
        );

        // תגובה מוצלחת
        res.status(200).json({
            success: true,
            message: "Fetched aliyah data for all users",
            allUsersAliyah,
        });
    } catch (error) {
        console.error("Error in getAllUsersAliyah: ", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const getAliyahFrom = async (req, res) => {
    const { userId } = req.body;

    try {
        // מציאת המשתמש לפי ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // אחזור פרטי העליות מתוך cartItems
        const aliyahIds = user.cartItems.map(item => item._id);
        if (!aliyahIds || aliyahIds.length === 0) {
            return res.status(404).json({ success: false, message: "No aliyot found" });
        }

        // אחזור פרטי העליות מה-DB
        const aliyahDetails = await TorahAliyah.find({ _id: { $in: aliyahIds } });
        if (aliyahDetails.length === 0) {
            return res.status(404).json({ success: false, message: "No aliyot details found" });
        }

        res.status(200).json({
            success: true,
            aliyah: aliyahDetails,
        });
    } catch (error) {
        console.error("Error in getAliyahFrom:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
export const payAliyot = async (req, res) => {
    const { userId, aliyahIds, paymentMethodId } = req.body;

    if (!userId || !aliyahIds || aliyahIds.length === 0 || !paymentMethodId) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        // שליפת המשתמש
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // חישוב הסכום לתשלום
        const aliyotToPay = user.TorahAliyah.filter(aliyah => aliyahIds.includes(aliyah._id.toString()));
        const totalAmount = aliyotToPay.reduce((sum, aliyah) => sum + (aliyah.price || 0), 0);

        if (totalAmount === 0) {
            return res.status(400).json({ success: false, message: "No valid aliyot to pay" });
        }

        // יצירת תשלום עם Stripe - עם ההגדרות החדשות
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100, // הסכום באגורות
            currency: "usd",
            payment_method: paymentMethodId,
            confirm: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            },
            return_url: `${process.env.REACT_APP_API_URL}/payment-success`, // או כל URL אחר שתרצה
        });

        // סימון העליות כמשולמות
        aliyotToPay.forEach(aliyah => {
            aliyah.isPaid = true;
            aliyah.paymentId = paymentIntent.id;
        });

        await user.save();

        res.status(200).json({
            success: true,
            message: "Payment successful",
            aliyot: aliyotToPay,
            paymentIntent,
        });
    } catch (error) {
        console.error("Error in payAliyot:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};
export const getUnpaidAliyot = async (req, res) => {
    const { userId } = req.body;
    console.log("Received request for unpaid aliyot with userId:", userId);

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    try {
        console.log("Fetching user aliyot...");
        const result = await fetchUserAliyah(userId);
        console.log("Fetch result:", result);

        if (!result.success) {
            console.log("Failed to fetch aliyot:", result);
            return res.status(result.status).json(result);
        }

        // סינון העליות שלא שולמו
        const unpaidAliyot = result.data.userTorahAliyah.filter(aliyah => !aliyah.isPaid);
        console.log("Filtered unpaid aliyot:", unpaidAliyot);

        return res.status(200).json({
            success: true,
            status: 200,
            data: { userTorahAliyah: unpaidAliyot },
        });
    } catch (error) {
        console.error("Detailed error in getUnpaidAliyot:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};
