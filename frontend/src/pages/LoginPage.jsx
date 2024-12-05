import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        await login(email, password);
        if (!error) {
            navigate("/homepage");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-yellow-400 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='w-full max-w-md bg-white bg-opacity-20 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
            >
                <div className='p-8'>
                    <h2 className='text-3xl font-bold mb-6 text-center text-white'>
                        ברוכים הבאים
                    </h2>

                    <form onSubmit={handleLogin}>
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

                        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                        <motion.button
                            className='mt-5 w-full py-3 px-4 bg-blue-600 text-white 
                            font-bold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                            focus:ring-offset-blue-200 transition duration-200'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
                            disabled={isLoading}
                            style={{ touchAction: 'manipulation' }}
                        >
                            {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "כניסה"}
                        </motion.button>
                    </form>
                </div>
                <div className='px-8 py-4 bg-black bg-opacity-30 flex justify-center'>
                    <p className='text-sm text-white'>
                        אינך רשום?{" "}
                        <Link to='/signup' className='text-yellow-300 hover:underline'>
                            הרשמה
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;