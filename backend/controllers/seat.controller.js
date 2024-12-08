// import mongoose from 'mongoose';
// import Seat from '../models/seat.model.js';

// // Get all seats
// const getAllSeats = async (req, res) => {
//   try {
//     const seats = await Seat.find().sort({ row: 1, number: 1 });
//     res.status(200).json(seats);
//   } catch (error) {
//     console.error('Error in getAllSeats:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get single seat
// const getSeatById = async (req, res) => {
//   try {
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({ error: 'Invalid seat ID format' });
//     }

//     const seat = await Seat.findById(req.params.id);
//     if (!seat) {
//       return res.status(404).json({ error: 'Seat not found' });
//     }
//     res.status(200).json(seat);
//   } catch (error) {
//     console.error('Error in getSeatById:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update seat
// const updateSeat = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { owner, price, reserved, row, number } = req.body;

//     console.log('Received update request:', {
//       id,
//       owner,
//       price,
//       reserved,
//       row,
//       number
//     });

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ error: 'Invalid seat ID format' });
//     }

//     const updateData = {
//       owner,
//       price: price || 0,
//       reserved,
//       row,
//       number
//     };

//     const updatedSeat = await Seat.findByIdAndUpdate(
//       id,
//       updateData,
//       { 
//         new: true,
//         runValidators: true 
//       }
//     );

//     if (!updatedSeat) {
//       return res.status(404).json({ error: 'Seat not found' });
//     }

//     console.log('Seat updated successfully:', updatedSeat);
//     res.status(200).json(updatedSeat);
//   } catch (error) {
//     console.error('Error in updateSeat:', error);
//     res.status(400).json({ 
//       error: error.message,
//       details: error
//     });
//   }
// };

// // Delete seat
// const deleteSeat = async (req, res) => {
//   try {
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({ error: 'Invalid seat ID format' });
//     }

//     const deletedSeat = await Seat.findByIdAndDelete(req.params.id);
//     if (!deletedSeat) {
//       return res.status(404).json({ error: 'Seat not found' });
//     }
//     res.status(200).json({ message: 'Seat deleted successfully' });
//   } catch (error) {
//     console.error('Error in deleteSeat:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// // Initialize seats
// const initializeSeats = async (req, res) => {
//   try {
//     console.log('Initializing seats');
//     await Seat.deleteMany({});
    
//     const seats = [];
//     for (let row = 0; row < 10; row++) {
//       for (let number = 0; number < 10; number++) {
//         seats.push({
//           row,
//           number,
//           reserved: false,
//           price: 0,
//           owner: ''
//         });
//       }
//     }
    
//     const createdSeats = await Seat.insertMany(seats);
//     console.log(`Created ${createdSeats.length} seats`);
//     res.status(200).json({ 
//       message: 'Seats initialized successfully',
//       count: createdSeats.length
//     });
//   } catch (error) {
//     console.error('Error in initializeSeats:', error);
//     res.status(500).json({ 
//       error: error.message,
//       details: error 
//     });
//   }
// };

// // Get statistics
// const getStats = async (req, res) => {
//   try {
//     const totalSeats = await Seat.countDocuments();
//     const reservedSeats = await Seat.countDocuments({ reserved: true });
//     const totalRevenue = await Seat.aggregate([
//       { $match: { reserved: true } },
//       { $group: {
//           _id: null,
//           total: { $sum: "$price" }
//         }
//       }
//     ]);

//     res.status(200).json({
//       totalSeats,
//       reservedSeats,
//       availableSeats: totalSeats - reservedSeats,
//       totalRevenue: totalRevenue[0]?.total || 0
//     });
//   } catch (error) {
//     console.error('Error in getStats:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// // Reset all seats
// const resetAllSeats = async (req, res) => {
//   try {
//     const result = await Seat.updateMany(
//       {},
//       { 
//         $set: { 
//           reserved: false,
//           owner: '',
//           price: 0
//         } 
//       }
//     );

//     res.status(200).json({
//       message: 'All seats reset successfully',
//       modifiedCount: result.modifiedCount
//     });
//   } catch (error) {
//     console.error('Error in resetAllSeats:', error);
//     res.status(500).json({ error: error.message });
//   }
// };
// // Cancel reservation for a seat
// const cancelReservation = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Validate seat ID
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ error: 'Invalid seat ID format' });
//     }

//     // Find and update the seat to cancel the reservation
//     const seat = await Seat.findByIdAndUpdate(
//       id,
//       {
//         reserved: false,
//         owner: '',
//         price: 0
//       },
//       { new: true }
//     );

//     if (!seat) {
//       return res.status(404).json({ error: 'Seat not found' });
//     }

//     res.status(200).json({
//       message: 'Reservation cancelled successfully',
//       seat: seat
//     });
//   } catch (error) {
//     console.error('Error in cancelReservation:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// export {
//   getAllSeats,
//   getSeatById,
//   updateSeat,
//   deleteSeat,
//   initializeSeats,
//   getStats,
//   resetAllSeats,
//   cancelReservation // Make sure to export this function
// };
