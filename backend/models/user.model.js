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
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date ,  
    
      
    TorahAliyah: [
      {
        quantity: { type: Number, required: true },
        date: {
          type: Date,
          required: true,
        },
        buyer: {
          type: String,
          required: true,
        },
        
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        description: {
          type: String,
          required: false,
        },
        isPaid: {
          type: Boolean,
          required: true,
          default: false,
        },
        paymentDetails: {
          stripePaymentId: { type: String, required: false },
          paymentDate: { type: Date, required: false },
        },
      },
    ],
    
    
  },
  { timestamps: true }
);

// הוספת אינדקס ייחודי לשדה email
userSchema.index({ email: 1 }, { unique: true });

// יצירת מודל משתמש
export const User = mongoose.model("User", userSchema);
