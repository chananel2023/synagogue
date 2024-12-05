import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, Lock, Loader } from "lucide-react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter.jsx";
import { useAuthStore } from "../store/authStore.js";

const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup, error, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            alert("נא למלא את כל השדות.");
            return;
        }
        try {
            await signup(email, password, name);
            navigate("/verify-email");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-yellow-400 px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='w-full max-w-md bg-white bg-opacity-20 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
                overflow-hidden'
            >
                <div className='p-4 sm:p-8'>
                    <h2 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-white'>
                        יצירת חשבון
                    </h2>

                    <form onSubmit={handleSignUp} className="space-y-4">
                        <Input
                            icon={User}
                            type='text'
                            placeholder="שם מלא"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            icon={Mail}
                            type='email'
                            placeholder="כתובת מייל"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            icon={Lock}
                            type='password'
                            placeholder="סיסמה"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className='text-red-500 font-semibold mt-2 text-sm'>{error}</p>}

                        <PasswordStrengthMeter password={password} />

                        <motion.button
                            className='mt-4 w-full py-3 px-4 bg-blue-600 text-white 
                            font-bold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                            focus:ring-offset-blue-200 transition duration-200 text-sm sm:text-base'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className='animate-spin mx-auto' size={20} /> : "להירשם"}
                        </motion.button>
                    </form>
                </div>
                <div className='px-4 sm:px-8 py-3 sm:py-4 bg-black bg-opacity-30 flex justify-center'>
                    <p className='text-xs sm:text-sm text-white'>
                        כבר רשום?{" "}
                        <Link to="/login" className='text-yellow-300 hover:underline'>
                            לכניסה לחץ כאן
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUpPage;