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
        setError(null);
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
        <div className="p-6 max-w-full">
            <h2 className="heebo-custom-font text-4xl font-bold text-center mb-4 text-gray-800">
                זמני תפילות
            </h2>

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tfilot.length === 0 ? (
                        <div className="text-center text-gray-500 col-span-2">
                            לא קיימות תפילות במערכת כרגע. חזור מאוחר יותר.
                        </div>
                    ) : (
                        tfilot.map((tfila) => (
                            <div
                                key={tfila._id}
                                className="flex flex-col items-center bg-gray-100 rounded-lg shadow-md p-4 text-center"
                            >
                                <span className="text-lg font-bold text-gray-800">{tfila.tfila}</span>
                                <span className="text-3xl font-mono font-bold text-blue-600">
                                    {tfila.time.split(':')[0]}
                                    <span className="text-2xl">:</span>
                                    {tfila.time.split(':')[1]}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default TfilotList;
