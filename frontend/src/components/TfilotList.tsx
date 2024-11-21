import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Tfila {
    _id: string;
    tfila: string;
    time: string;
}

const TfilotList: React.FC = () => {
    const [tfilot, setTfilot] = useState<Tfila[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTfilot = async () => {
        setLoading(true);
        setError(null); // Reset error
        try {
            const response = await axios.get<Tfila[]>('http://localhost:5007/api/tfilot');
            setTfilot(response.data);
        } catch (err) {
            setError('שגיאה בטעינת התפילות');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTfilot();
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">זמני תפילות</h2>

            {loading && (
                <div className="flex justify-center">
                    <div className="spinner border-t-4 border-blue-500 rounded-full w-8 h-8"></div>
                </div>
            )}

            {error && !loading && (
                <div className="text-center mb-4">
                    <p className="text-red-600">{error}</p>
                    <button
                        onClick={fetchTfilot}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        נסה שוב
                    </button>
                </div>
            )}

            {!loading && !error && (
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-right">תפילה</th>
                            <th className="border border-gray-300 px-4 py-2 text-right">שעה</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tfilot.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={2}
                                    className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                                >
                                    לא קיימות תפילות במערכת כרגע. חזור מאוחר יותר.
                                </td>
                            </tr>
                        ) : (
                            tfilot.map((tfila) => (
                                <tr key={tfila._id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2 text-right">
                                        {tfila.tfila}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-right">
                                        {tfila.time}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TfilotList;

