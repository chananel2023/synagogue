import React, { useState, useEffect } from "react";
import axios from "axios";
import { Accordion, AccordionSummary, AccordionDetails,  TextField, Typography, Box, InputAdornment } from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { Search as SearchIcon, Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { motion  } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {User} from '../models/User'
import { NewAliyah } from "../models/NewAliyah";




const apiUrl = process.env.REACT_APP_API_URL



const AdminPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [newAliyah, setNewAliyah] = useState<NewAliyah>({
        _id: "", // מזהה ריק כברירת מחדל
        price: 0,
        buyer: "",
        date: "",
      });
      
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedDate] = useState<string>(new Date().toISOString().split("T")[0]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const fetchUsers = async () => {
        setLoading(true);
        try {
            
            const { data } = await axios.get(`${apiUrl}/api/aliyah/getAllUsersAliyah`);
            setUsers(data.allUsersAliyah);
            setFilteredUsers(data.allUsersAliyah);
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("שגיאה בטעינת משתמשים", { rtl: true });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddAliyah = async (userId: string) => {
        try {
            if (!newAliyah.price || !newAliyah.buyer || !newAliyah.date) {
                toast.warn("אנא מלא את כל השדות הנדרשים", { rtl: true });
                return;
            }

            await axios.post(`${apiUrl}/api/aliyah/addAliyahToUser`, {
                userId,
                aliyahDetails: { price: newAliyah.price, buyer: newAliyah.buyer, date: new Date(selectedDate) },
            });

            fetchUsers();
            setNewAliyah({ _id: "", price: 0, buyer: "", date: "" });

            toast.success("העלייה נוספה בהצלחה", { rtl: true });
        } catch (error) {
            console.error("Error adding aliyah:", error);
            toast.error("שגיאה בהוספת העלייה", { rtl: true });
        }
    };

    const handleDeleteAliyah = async (userId: string, aliyahId: string) => {
        try {
            await axios.delete(`${apiUrl}/api/aliyah/delete`, { data: { userId, aliyahId } });
            fetchUsers();
            toast.success("העלייה נמחקה בהצלחה", { rtl: true });
        } catch (error) {
            console.error("Error deleting aliyah:", error);
            toast.error("שגיאה במחיקת העלייה", { rtl: true });
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(query)
        );
        setFilteredUsers(filteredUsers);
    };

    return (
        <Box
            className="p-4 min-h-screen"
            sx={{
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <ToastContainer position="top-center" rtl={true} />
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4 w-full max-w-4xl"
            >
                <Typography variant="h4" className="font-bold text-gray-800">
                    ניהול עליות
                </Typography>
                <Box className="mt-3">
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="חפש משתמש..."
                        value={searchQuery}
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon className="text-gray-500" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </motion.div>

            {loading ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center items-center h-64 bg-white rounded-xl shadow-md"
                >
                    <div className="relative w-12 h-12">
                        <motion.div
                            animate={{
                                rotate: 360,
                                transition: { duration: 1, repeat: Infinity, ease: "linear" },
                            }}
                            className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 border-opacity-20 rounded-full"
                        />
                        <motion.div
                            animate={{
                                rotate: -360,
                                transition: { duration: 1, repeat: Infinity, ease: "linear" },
                            }}
                            className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-500 rounded-full"
                        />
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-3 w-full max-w-4xl"
                >
                    {filteredUsers.map((user) => (
                        <Accordion
                            key={user.userId}
                            className="bg-white rounded-xl shadow-md overflow-hidden"
                        >
                            <AccordionSummary
                                expandIcon={
                                    <ExpandMoreIcon className="text-gray-500 group-hover:text-gray-700" />
                                }
                                className="bg-gray-100 group"
                            >
                                <Typography className="text-gray-800 font-medium">{user.name}</Typography>
                                <Typography className="text-gray-600 ml-2">
                                    סכום ששולם: {user.paidSum} | סכום שחייב: {user.unpaidSum}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails className="bg-white pt-3">
                                <div className="mb-3">
                                    <TextField
                                        label=" סיבה לחיוב  "
                                        variant="outlined"
                                        size="small"
                                        className="mr-2 bg-gray-100 text-gray-800"
                                        value={newAliyah.buyer}
                                        onChange={(e) =>
                                            setNewAliyah({ ...newAliyah, buyer: e.target.value })
                                        }
                                    />
                                    <TextField
                                        label="עלות"
                                        variant="outlined"
                                        size="small"
                                        type="number"
                                        className="mr-2 bg-gray-100 text-gray-800"
                                        value={newAliyah.price}
                                        onChange={(e) =>
                                            setNewAliyah({ ...newAliyah, price: Number(e.target.value) })
                                        }
                                    />
                                    <TextField
                                        label="תאריך"
                                        variant="outlined"
                                        size="small"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        className="bg-gray-100 text-gray-800"
                                        value={newAliyah.date}
                                        onChange={(e) =>
                                            setNewAliyah({ ...newAliyah, date: e.target.value })
                                        }
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg mt-2"
                                        onClick={() => handleAddAliyah(user.userId)}
                                    >
                                        <AddIcon className="mr-1" />
                                        הוסף
                                    </motion.button>
                                </div>

                                <div className="space-y-2">
    {user.aliyahDetails?.length ? (
        user.aliyahDetails.map((aliyah) => (
            <motion.div
                key={aliyah._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
            >
                <div className="flex-1">
                    <Typography className="text-gray-800">{`סכום: ${
                        aliyah.price ? `${aliyah.price} ₪` : "לא זמין"
                    }`}</Typography>
                    <Typography className="text-gray-600">{`תאריך: ${
                        aliyah.date
                            ? new Date(aliyah.date).toLocaleDateString("he-IL")
                            : "לא זמין"
                    }`}</Typography>
                    <Typography className="text-gray-600">{`רוכש: ${
                        aliyah.buyer || "לא ידוע"
                    }`}</Typography>
                    <Typography
                        className={`text-sm ${
                            aliyah.isPaid ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {aliyah.isPaid ? "שולם" : "לא שולם"}
                    </Typography>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                    onClick={() => handleDeleteAliyah(user.userId, aliyah._id)}
                >
                    <DeleteIcon className="mr-1" />
                    מחק
                </motion.button>
            </motion.div>
        ))
    ) : (
        <Typography className="text-gray-600">אין נתונים להצגה</Typography>
    )}
</div>

                            </AccordionDetails>
                        </Accordion>
                    ))}
                </motion.div>
            )}
        </Box>
    );
};

export default AdminPage;