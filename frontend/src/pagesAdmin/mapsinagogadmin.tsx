import React, { useState, useEffect } from 'react';

interface Seat {
    _id: string;
    row: number;
    number: number;
    reserved: boolean;
    owner?: string;
    price?: number;
}

interface SeatData {
    owner: string;
    price: string;
    reserved: boolean;
}

interface Stats {
    totalSeats: number;
    reservedSeats: number;
    availableSeats: number;
    totalRevenue: number;
}

const SynagogueAdmin: React.FC = () => {
    const [seats, setSeats] = useState<Seat[]>([]);
    const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [stats, setStats] = useState<Stats | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [seatData, setSeatData] = useState<SeatData>({
        owner: '',
        price: '',
        reserved: false
    });

    useEffect(() => {
        fetchSeats();
        fetchStats();
    }, []);

    const fetchSeats = async (): Promise<void> => {
        try {
            setIsLoading(true);
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
        } finally {
            setIsLoading(false);
        }
    };

    const fetchStats = async (): Promise<void> => {
        try {
            const response = await fetch('http://localhost:5007/api/seats/stats', {
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch stats');
            }

            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const handleSeatClick = (seat: Seat): void => {
        setSelectedSeat(seat);
        setSeatData({
            owner: seat.owner || '',
            price: seat.price?.toString() || '',
            reserved: seat.reserved || false
        });
        setIsDialogOpen(true);
    };

    const handleUpdateSeat = async (seatId: string): Promise<void> => {
        try {
            setIsLoading(true);
            console.log('Updating seat with data:', {
                ...seatData,
                row: selectedSeat?.row,
                number: selectedSeat?.number
            });

            const response = await fetch(`http://localhost:5007/api/seats/${seatId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...seatData,
                    price: parseFloat(seatData.price) || 0,
                    row: selectedSeat?.row,
                    number: selectedSeat?.number
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update seat');
            }

            await Promise.all([fetchSeats(), fetchStats()]);
            setIsDialogOpen(false);
            setEditMode(false);
            setError('');
        } catch (error) {
            console.error('Error updating seat:', error);
            setError(error instanceof Error ? error.message : 'שגיאה בעדכון המקום');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteSeat = async (seatId: string): Promise<void> => {
        if (!window.confirm('האם אתה בטוח שברצונך למחוק מקום זה?')) {
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:5007/api/seats/${seatId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to delete seat');
            }

            await Promise.all([fetchSeats(), fetchStats()]);
            setIsDialogOpen(false);
            setError('');
        } catch (error) {
            console.error('Error deleting seat:', error);
            setError('שגיאה במחיקת המקום');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = async (): Promise<void> => {
        if (!window.confirm('האם אתה בטוח שברצונך לאפס את כל המקומות?')) {
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:5007/api/seats/reset', {
                method: 'POST',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to reset seats');
            }

            await Promise.all([fetchSeats(), fetchStats()]);
            setError('');
        } catch (error) {
            console.error('Error resetting seats:', error);
            setError('שגיאה באיפוס המקומות');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInitialize = async (): Promise<void> => {
        if (!window.confirm('האם אתה בטוח שברצונך לאתחל את כל המקומות? פעולה זו תמחק את כל הנתונים הקיימים.')) {
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:5007/api/seats/initialize', {
                method: 'POST',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to initialize seats');
            }

            await Promise.all([fetchSeats(), fetchStats()]);
            setError('');
        } catch (error) {
            console.error('Error initializing seats:', error);
            setError('שגיאה באתחול המקומות');
        } finally {
            setIsLoading(false);
        }
    };

    const rows: number = 10;
    const seatsPerRow: number = 10;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="p-8 text-right min-h-screen bg-gray-50" dir="rtl">
            <h2 className="text-2xl font-bold mb-6 text-center">ניהול מקומות בית הכנסת</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-lg border p-6 mb-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4">סטטיסטיקות</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-4 rounded">
                        <p className="font-bold">סה"כ מקומות</p>
                        <p className="text-2xl mt-2">{stats?.totalSeats || 0}</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded">
                        <p className="font-bold">מקומות תפוסים</p>
                        <p className="text-2xl mt-2">{stats?.reservedSeats || 0}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded">
                        <p className="font-bold">מקומות פנויים</p>
                        <p className="text-2xl mt-2">{stats?.availableSeats || 0}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded">
                        <p className="font-bold">סה"כ הכנסות</p>
                        <p className="text-2xl mt-2">₪{stats?.totalRevenue || 0}</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mb-6">
                <button
                    onClick={handleInitialize}
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    אתחל מקומות
                </button>
                <button
                    onClick={handleReset}
                    className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition-colors"
                >
                    אפס מקומות
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex flex-col items-center gap-2">
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <div key={rowIndex} className="flex gap-2">
                            {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
                                const seatNumber = rowIndex * seatsPerRow + seatIndex + 1;
                                const seat = seats.find(s => s.row === rowIndex && s.number === seatIndex);

                                return (
                                    <button
                                        key={seatIndex}
                                        onClick={() => handleSeatClick(seat || {
                                            _id: '',
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
            </div>

            {isDialogOpen && selectedSeat && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-sm w-full m-4">
                        <h3 className="text-xl font-bold mb-4">
                            {editMode ? 'עריכת מקום' : 'פרטי מקום'} מספר {selectedSeat.number + 1}
                        </h3>

                        {editMode ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-2">בעלים:</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                        value={seatData.owner}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setSeatData({ ...seatData, owner: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">מחיר:</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                        value={seatData.price}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setSeatData({ ...seatData, price: e.target.value })}
                                    />
                                </div>
                                <div className="flex items-center">
                                    <label className="mr-2">תפוס:</label>
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5"
                                        checked={seatData.reserved}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setSeatData({ ...seatData, reserved: e.target.checked })}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2 mb-4">
                                <p>בעלים: {selectedSeat.owner || 'אין'}</p>
                                <p>מחיר: {selectedSeat.price ? `₪${selectedSeat.price}` : 'לא נקבע'}</p>
                                <p>סטטוס: {selectedSeat.reserved ? 'תפוס' : 'פנוי'}</p>
                            </div>
                        )}

                        <div className="flex gap-2 mt-6">
                            {editMode ? (
                                <>
                                    <button
                                        onClick={() => selectedSeat._id && handleUpdateSeat(selectedSeat._id)}
                                        className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                    >
                                        שמור שינויים
                                    </button>
                                    <button
                                        onClick={() => setEditMode(false)}
                                        className="flex-1 bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
                                    >
                                        ביטול
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setEditMode(true)}
                                        className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                    >
                                        ערוך מקום
                                    </button>
                                    {selectedSeat._id && (
                                        <button
                                            onClick={() => handleDeleteSeat(selectedSeat._id)}
                                            className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                                        >
                                            מחק מקום
                                        </button>
                                    )}
                                </>
                            )}
                        </div>

                        <button
                            onClick={() => {
                                setIsDialogOpen(false);
                                setEditMode(false);
                                setError('');
                            }}
                            className="w-full mt-4 bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
                        >
                            סגור
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SynagogueAdmin;