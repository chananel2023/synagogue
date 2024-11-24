import React, { useState, useEffect } from 'react';
import axios from 'axios';
interface Tfila {
    _id: string;
    tfila: string;
    time: string;  // שדה רק לשעה
}

const AdminTfilot = () => {
    const [tfilot, setTfilot] = useState<Tfila[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [newTfila, setNewTfila] = useState<{ tfila: string, time: string }>({ tfila: '', time: '' });
    const [editingTfila, setEditingTfila] = useState<Tfila | null>(null);
    const [message, setMessage] = useState<string>(''); // הודעות שגיאה או הצלחה לאדמין

    useEffect(() => {
        const fetchTfilot = async () => {
            try {
                const response = await axios.get('http://localhost:5007/api/tfilot');
                setTfilot(response.data);
                setLoading(false);
            } catch (error) {
                setMessage('שגיאה בטעינת התפילות');
                setLoading(false);
            }
        };
        fetchTfilot();
    }, []);

    const handleCreateTfila = async () => {
        try {
            const response = await axios.post('http://localhost:5007/api/tfilot', newTfila);
            setTfilot([response.data, ...tfilot]);
            setNewTfila({ tfila: '', time: '' });
            setMessage('התפילה נוספה בהצלחה');
        } catch (error) {
            setMessage('שגיאה בהוספת תפילה');
        }
    };

    const handleDeleteTfila = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5007/api/tfilot/${id}`);
            setTfilot(tfilot.filter((tfila) => tfila._id !== id));
            setMessage('התפילה נמחקה בהצלחה');
        } catch (error) {
            setMessage('שגיאה במחיקת תפילה');
        }
    };

    const handleUpdateTfila = async () => {
        if (editingTfila) {
            try {
                const updatedTfila = await axios.put(
                    `http://localhost:5007/api/tfilot/${editingTfila._id}`,
                    editingTfila
                );
                setTfilot(tfilot.map((tfila) => (tfila._id === updatedTfila.data._id ? updatedTfila.data : tfila)));
                setEditingTfila(null);
                setMessage('התפילה עודכנה בהצלחה');
            } catch (error) {
                setMessage('שגיאה בעדכון תפילה');
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
        <div>
            <h2>ניהול תפילות - אדמין</h2>

            {message && <div>{message}</div>}

            {/* יצירת תפילה חדשה */}
            <div>
                <h3>הוסף תפילה חדשה</h3>
                <input
                    type="text"
                    name="tfila"
                    value={newTfila.tfila}
                    onChange={handleChange}
                    placeholder="תפילה"
                />
                <input
                    type="time"
                    name="time"
                    value={newTfila.time}
                    onChange={handleChange}
                    placeholder="שעה"
                />
                <button onClick={handleCreateTfila}>הוסף תפילה</button>
            </div>

            {/* עדכון תפילה */}
            {editingTfila && (
                <div>
                    <h3>עדכון תפילה</h3>
                    <input
                        type="text"
                        name="tfila"
                        value={editingTfila.tfila}
                        onChange={handleChange}
                        placeholder="תפילה"
                    />
                    <input
                        type="time"
                        name="time"
                        value={editingTfila.time}
                        onChange={handleChange}
                        placeholder="שעה"
                    />
                    <button onClick={handleUpdateTfila}>עדכן תפילה</button>
                </div>
            )}

            {/* הצגת התפילות */}
            {loading ? (
                <p>טוען תפילות...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>תפילה</th>
                            <th>שעה</th>
                            <th>פעולות</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(tfilot) && tfilot.map((tfila) => (
                            <tr key={tfila._id}>
                                <td>{tfila.tfila}</td>
                                <td>{tfila.time}</td>
                                <td>
                                    <button onClick={() => handleEditTfila(tfila)}>ערוך</button>
                                    <button onClick={() => handleDeleteTfila(tfila._id)}>מחק</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminTfilot;
