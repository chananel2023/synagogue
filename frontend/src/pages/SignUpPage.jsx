import { motion } from "framer-motion";
import { Mail, User, Lock, Loader } from "lucide-react";
import Input from "../components/Input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter.jsx";
import { useAuthStore } from "../store/authStore.js";


const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {signup,error,isLoading} =useAuthStore()
    const navigate = useNavigate();  // הוספת ה-hook של useNavigate

    const handleSignUp = async(e) => {
        e.preventDefault();
        try {
          await signup (email,password,name);
          navigate("/verify-email")

        } catch (error) {
          console.log(error)
          
        }

        if (!name || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        navigate("/signup");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full bg-yellow-400 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
            overflow-hidden'
        >
            <div className='p-8'>
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-500 to-yellow-50 text-transparent bg-clip-text'>
                    Create Account
                </h2>

                <form onSubmit={handleSignUp}>
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
                        placeholder="כתןבת מייל"
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
                    {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
                    
                    <PasswordStrengthMeter password={password} />

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
                        {isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "להירשם"}
                    </motion.button>
                </form>
            </div>
            <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                <p className='text-sm text-gray-400'>
                      כבר רשום ?{" "}
                    <Link to={"/login"} className='text-green-400 hover:underline'>
                       לכניסה לחץ כאן
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default SignUpPage;
