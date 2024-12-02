import React, { useState, useEffect } from "react";
import axios from "axios";

interface Tfila {
    _id: string;
    tfila: string;
    time: string;
}

const AdminTfilot: React.FC = () => {
    const [tfilot, setTfilot] = useState<Tfila[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [newTfila, setNewTfila] = useState<{ tfila: string; time: string }>({
        tfila: "",
        time: "",
    });
    const [editingTfila, setEditingTfila] = useState<Tfila | null>(null);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const fetchTfilot = async () => {
            try {
                const response = await axios.get("http://localhost:5007/api/tfilot");
                setTfilot(response.data);
                setLoading(false);
            } catch (error) {
                setMessage("שגיאה בטעינת התפילות");
                setLoading(false);
            }
        };
        fetchTfilot();
    }, []);

    const handleCreateTfila = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5007/api/tfilot",
                newTfila
            );
            setTfilot([response.data, ...tfilot]);
            setNewTfila({ tfila: "", time: "" });
            setMessage("התפילה נוספה בהצלחה");
        } catch (error) {
            setMessage("שגיאה בהוספת תפילה");
        }
    };

    const handleDeleteTfila = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5007/api/tfilot/${id}`);
            setTfilot(tfilot.filter((tfila) => tfila._id !== id));
            setMessage("התפילה נמחקה בהצלחה");
        } catch (error) {
            setMessage("שגיאה במחיקת תפילה");
        }
    };

    const handleUpdateTfila = async () => {
        if (editingTfila) {
            try {
                const response = await axios.put(
                    `http://localhost:5007/api/tfilot/${editingTfila._id}`,
                    {
                        tfila: editingTfila.tfila,
                        time: editingTfila.time,
                    }
                );
                setTfilot(
                    tfilot.map((tfila) =>
                        tfila._id === response.data._id ? response.data : tfila
                    )
                );
                setEditingTfila(null);
                setMessage("התפילה עודכנה בהצלחה");
            } catch (error) {
                setMessage("שגיאה בעדכון תפילה");
            }
        }
    };

    const handleEditTfila = (tfila: Tfila) => {
        setEditingTfila({ ...tfila });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (editingTfila) {
            setEditingTfila({ ...editingTfila, [name]: value });
        } else {
            setNewTfila({ ...newTfila, [name]: value });
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold text-center mb-8">ניהול תפילות - אדמין</h2>

            {message && (
                <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md shadow">
                    {message}
                </div>
            )}

            <div className="flex gap-8">
                {/* צד ימין: הוספת תפילה */}
                <div className="w-1/3 bg-white p-6 rounded-md shadow">
                    <h3 className="text-xl font-semibold mb-4">הוסף תפילה חדשה</h3>
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            name="tfila"
                            value={newTfila.tfila}
                            onChange={handleChange}
                            placeholder="תפילה"
                            className="p-3 border rounded-md focus:outline-blue-400"
                        />
                        <input
                            type="time"
                            name="time"
                            value={newTfila.time}
                            onChange={handleChange}
                            placeholder="שעה"
                            className="p-3 border rounded-md focus:outline-blue-400"
                        />
                        <button
                            onClick={handleCreateTfila}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                        >
                            הוסף תפילה
                        </button>
                    </div>
                </div>

                {/* צד שמאל: הצגת התפילות */}
                <div className="w-2/3 bg-white p-6 rounded-md shadow">
                    <h3 className="text-xl font-semibold mb-4">רשימת תפילות</h3>
                    {loading ? (
                        <p className="text-center text-gray-500">טוען תפילות...</p>
                    ) : (
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-3 border">תפילה</th>
                                    <th className="p-3 border">שעה</th>
                                    <th className="p-3 border">פעולות</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(tfilot) &&
                                    tfilot.map((tfila) => (
                                        <tr
                                            key={tfila._id}
                                            className={`hover:bg-gray-100 ${editingTfila &&
                                                    editingTfila._id === tfila._id
                                                    ? "bg-yellow-100"
                                                    : ""
                                                }`}
                                        >
                                            <td className="p-3 border">{tfila.tfila}</td>
                                            <td className="p-3 border">{tfila.time}</td>
                                            <td className="p-3 border flex gap-4">
                                                <button
                                                    onClick={() => handleEditTfila(tfila)}
                                                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-md"
                                                >
                                                    ערוך
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteTfila(tfila._id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md"
                                                >
                                                    מחק
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    )}

                    {editingTfila && (
                        <div className="mt-6">
                            <h4 className="text-lg font-semibold mb-2">עריכת תפילה</h4>
                            <input
                                type="text"
                                name="tfila"
                                value={editingTfila.tfila}
                                onChange={handleChange}
                                placeholder="שם תפילה"
                                className="p-3 border rounded-md focus:outline-blue-400 mb-4"
                            />
                            <input
                                type="time"
                                name="time"
                                value={editingTfila.time}
                                onChange={handleChange}
                                placeholder="שעה"
                                className="p-3 border rounded-md focus:outline-blue-400"
                            />
                            <div className="flex gap-4 mt-4">
                                <button
                                    onClick={handleUpdateTfila}
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md"
                                >
                                    עדכן תפילה
                                </button>
                                <button
                                    onClick={() => setEditingTfila(null)}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md"
                                >
                                    בטל
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminTfilot;
