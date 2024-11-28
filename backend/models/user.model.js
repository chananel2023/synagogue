import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"], // אימות אימייל
      unique: true, // אימייל ייחודי לכל משתמש
      match: [/.+@.+\..+/, "Please enter a valid email"], // בדיקת תקינות פורמט האימייל
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6, // מינימום אורך סיסמה
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 3, // מינימום אורך שם
    },
    lastLogin: {
      type: Date,
      default: Date.now, // ערך ברירת מחדל לזמן הנוכחי
    },
    isVerified: {
      type: Boolean,
      default: false, // משתמש אינו מאומת כברירת מחדל
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,

    // עגלת קניות
    cartItems: [
      {
        quantity: {
          type: Number,
          default: 1, // כמות ברירת מחדל
        },
        product: {
          type: mongoose.Schema.Types.ObjectId, // הפניה למוצר
          ref: "Product", // שם האוסף שאליו מתייחסים
        },
      },
    ],
  },
  { timestamps: true } // מוסיף createdAt ו-updatedAt
);

// הוספת אינדקס ייחודי לשדה email
userSchema.index({ email: 1 }, { unique: true });

// יצירת מודל משתמש
export const User = mongoose.model("User", userSchema);
