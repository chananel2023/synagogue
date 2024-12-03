import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import Input from "../components/Input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { login, isLoading, error } = useAuthStore();
    const navigate = useNavigate(); // השתמש ב-useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();

        // קריאה לפונקציית ההתחברות
        await login(email, password); 

        // אם ההתחברות הצליחה, נווט לעמוד הבית
        if (error) {
            console.log("Failed login attempt", error); // אם ההתחברות לא הצליחה
        } else {
            
            navigate("/homepage"); // ניווט אחרי הצלחה
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='max-w-md w-full bg-yellow-400 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
                overflow-hidden'
            >
                <div className='p-8'>
                    <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-500 to-yellow-100 text-transparent bg-clip-text'>
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
                            className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-yellow-200 to-yellow-300 text-white 
                            font-bold rounded-lg shadow-lg hover:from-yellow-200
                            hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                            focus:ring-offset-gray-900 transition duration-200'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className='w-6 h-6 animate-spin justify-content mx-auto'/> : "כניסה"}
                        </motion.button>
                    </form>
                </div>
                <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                    <p className='text-sm text-gray-400'>
                        אינך רשום{" "}
                        <Link to='/signup' className='text-green-400 hover:underline'>
                            הרשמה
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
    
};

export default LoginPage;
