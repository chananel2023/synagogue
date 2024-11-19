import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Tfila {
    _id: string;
    tfila: string;
    time: string;
}

const TfilotList: React.FC = () => {
    const [tfilot, setTfilot] = useState<Tfila[]>([]);
    const [error, setError] = useState<string | null>(null);

    // פונקציה לקרוא את זמני התפילות מה-API
    const fetchTfilot = async () => {
        try {
            const response = await axios.get('http://localhost:5007/api/tfilot');
            setTfilot(response.data);
        } catch (err) {
            setError('שגיאה בטעינת התפילות');
        }
    };

    // קריאה ל-fetchTfilot בעת טעינת הקומפוננטה
    useEffect(() => {
        fetchTfilot();
    }, []);

    return (
        <div>
            <h2>זמני תפילות</h2>
            {error && <p>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>תפילה</th>
                        <th>שעה</th>
                    </tr>
                </thead>
                <tbody>
                    {tfilot.length === 0 ? (
                        <tr>
                            <td colSpan={2}>לא נמצאו תפילות</td>
                        </tr>
                    ) : (
                        tfilot.map((tfila) => (
                            <tr key={tfila._id}>
                                <td>{tfila.tfila}</td>
                                <td>{tfila.time}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TfilotList;
