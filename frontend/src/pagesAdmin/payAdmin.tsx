import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    TextField,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { User } from "../models/User";
import { NewAliyah } from "../models/NewAliyah";

const AdminPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [newAliyah, setNewAliyah] = useState<NewAliyah>({
        price: 0,
        buyer: "",
        date: "",
    });
    const [loading, setLoading] = useState<boolean>(false);

    // שליפת כל המידע על משתמשים
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("http://localhost:5007/api/aliyah/getAllUsersAliyah");
            setUsers(data.allUsersAliyah);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // הוספת עלייה למשתמש
    const handleAddAliyah = async (userId: string) => {
        try {
            if (!newAliyah.price || !newAliyah.buyer || !newAliyah.date) {
                alert("אנא מלא את כל השדות הנדרשים.");
                return;
            }

            await axios.post("http://localhost:5007/api/aliyah/addAliyahToUser", {
                userId,
                aliyahDetails: {
                    price: newAliyah.price,
                    buyer: newAliyah.buyer,
                    date: newAliyah.date,
                },
            });

            fetchUsers(); // עדכון הנתונים
            setNewAliyah({ price: 0, buyer: "", date: "" }); // איפוס הטופס
        } catch (error) {
            console.error("Error adding aliyah:", error);
        }
    };

    // מחיקת עלייה
    const handleDeleteAliyah = async (userId: string, aliyahId: string) => {
        try {
            await axios.delete("http://localhost:5007/api/aliyah/delete", {
                data: { userId, aliyahId },
            });
            fetchUsers(); // עדכון הנתונים
        } catch (error) {
            console.error("Error deleting aliyah:", error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <Typography variant="h4">ניהול עליות</Typography>
            {loading ? (
                <Typography>טוען נתונים...</Typography>
            ) : (
                users.map((user) => (
                    <Accordion key={user.userId}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{user.name}</Typography>
                            <Typography style={{ marginLeft: "10px" }}>
                                {`סכום ששולם: ${user.paidSum} | סכום שחייב: ${user.unpaidSum}`}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div style={{ marginBottom: "20px" }}>
                                <TextField
                                    label="סיבה לחיוב "
                                    variant="outlined"
                                    size="small"
                                    style={{ marginRight: "10px" }}
                                    value={newAliyah.buyer}
                                    onChange={(e) =>
                                        setNewAliyah({
                                            ...newAliyah,
                                            buyer: e.target.value,
                                        })
                                    }
                                />
                                <TextField
                                    label='עלות'
                                    variant="outlined"
                                    size="small"
                                    type="number"
                                    style={{ marginRight: "10px" }}
                                    value={newAliyah.price}
                                    onChange={(e) =>
                                        setNewAliyah({
                                            ...newAliyah,
                                            price: Number(e.target.value),
                                        })
                                    }
                                />
                                <TextField
                                    label="תאריך"
                                    variant="outlined"
                                    size="small"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={newAliyah.date}
                                    onChange={(e) =>
                                        setNewAliyah({
                                            ...newAliyah,
                                            date: e.target.value,
                                        })
                                    }
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleAddAliyah(user.userId)}
                                    style={{ marginTop: "10px" }}
                                >
                                    הוסף
                                </Button>
                            </div>
                            <div>
    {user.aliyahDetails.map((aliyah) => (
        <div
            key={aliyah._id}
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
            }}
        >
            <div style={{ flex: 1 }}>
                <Typography>{`סכום: ${aliyah.price} ₪`}</Typography>
                <Typography>{`תאריך: ${new Date(aliyah.date).toLocaleDateString("he-IL")}`}</Typography>
                <Typography>{`מתי נקנה ${aliyah.buyer}`}</Typography>
            </div>
            <Button
                variant="outlined"
                color="error"
                onClick={() =>
                    handleDeleteAliyah(user.userId, aliyah._id)
                }
            >
                מחק
            </Button>
        </div>
    ))}
</div>

                        </AccordionDetails>
                    </Accordion>
                ))
            )}
        </div>
    );
};

export default AdminPage;
