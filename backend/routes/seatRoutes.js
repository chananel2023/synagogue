// import express from 'express';
// import {
//     // createSeat,
//     getAllSeats,
//     getSeatById,
//     updateSeat,
//     deleteSeat,
//     initializeSeats,
//     resetAllSeats,
//     getSeatStats,
//     reserveSeat,
//     cancelReservation
// } from '../controllers/seat.controller.js';

// const router = express.Router();

// // Base routes
// router.get('/', getAllSeats);
// router.get('/stats', getSeatStats);
// router.get('/:id', getSeatById);
// router.put('/:id', updateSeat);
// router.delete('/:id', deleteSeat);
// // בקובץ routes/seatRoutes.js
// // Special actions
// router.post('/', createSeat);  // הוספת נתיב ליצירת מושב בודד
// router.post('/initialize', initializeSeats);
// router.post('/reset', resetAllSeats);
// router.post('/:id/reserve', reserveSeat);
// router.post('/:id/cancel', cancelReservation);

// export default router;