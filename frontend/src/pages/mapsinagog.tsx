// src/components/SynagogueMap.tsx
import React, { useState, useEffect } from 'react';

interface Seat {
    id: string;
    row: number;
    number: number;
    reserved: boolean;
    owner?: string;
    price?: number;
}

const SynagogueMap: React.FC = () => {
    const [seats, setSeats] = useState<Seat[]>([]);
    const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchSeats();
    }, []);

    const fetchSeats = async (): Promise<void> => {
        try {
            const response = await fetch('http://localhost:5007/api/seats', {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch seats');
            }

            const data = await response.json();
            setSeats(data);
            setError('');
        } catch (error) {
            console.error('Error fetching seats:', error);
            setError('שגיאה בטעינת המקומות');
        }
    };

    const handleSeatClick = (seat: Seat): void => {
        setSelectedSeat(seat);
        setIsDialogOpen(true);
    };

    const handlePurchase = async (seatId: string) => {
        try {
            const response = await fetch('http://localhost:5007/api/addToCart', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    seatId: seatId,
                    type: 'seat'
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add seat to cart');
            }

            window.location.href = '/cart';
        } catch (error) {
            console.error('Error adding seat to cart:', error);
            setError('שגיאה בהוספה לעגלת הקניות');
        }
    };

    const rows: number = 10;
    const seatsPerRow: number = 10;

    return (
        <div className="p-8 text-right min-h-screen bg-gray-50" dir="rtl">
            <h2 className="text-2xl font-bold mb-6 text-center">מפת מקומות בית הכנסת</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="flex flex-col items-center gap-2 bg-white p-6 rounded-lg shadow-sm">
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <div key={rowIndex} className="flex gap-2">
                        {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
                            const seatNumber = rowIndex * seatsPerRow + seatIndex + 1;
                            const seat = seats.find(s => s.row === rowIndex && s.number === seatIndex);

                            return (
                                <button
                                    key={seatIndex}
                                    onClick={() => handleSeatClick(seat || {
                                        id: seatNumber.toString(),
                                        row: rowIndex,
                                        number: seatIndex,
                                        reserved: false
                                    })}
                                    className={`
                    w-12 h-12 rounded
                    ${seat?.reserved ? 'bg-red-500' : 'bg-green-500'}
                    text-white font-medium
                    hover:opacity-90 transition-opacity
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  `}
                                >
                                    {seatNumber}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>

            {isDialogOpen && selectedSeat && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-sm w-full m-4">
                        <h3 className="text-xl font-bold mb-4">
                            מקום מספר {selectedSeat.id}
                        </h3>

                        <div className="mb-6">
                            {selectedSeat.reserved ? (
                                <div className="bg-red-50 p-4 rounded">
                                    <p>מקום זה תפוס על ידי: {selectedSeat.owner || 'לא צוין'}</p>
                                    {selectedSeat.price && (
                                        <p className="mt-2">מחיר: ₪{selectedSeat.price}</p>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <p className="bg-green-50 p-4 rounded">מקום זה פנוי</p>
                                    {selectedSeat.price && (
                                        <p>מחיר: ₪{selectedSeat.price}</p>
                                    )}
                                    <button
                                        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                        onClick={() => handlePurchase(selectedSeat.id)}
                                    >
                                        הוסף לעגלת הקניות
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <button
                                className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
                                onClick={() => setIsDialogOpen(false)}
                            >
                                סגור
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SynagogueMap;