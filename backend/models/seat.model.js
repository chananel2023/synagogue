// import mongoose from 'mongoose';

// const seatSchema = new mongoose.Schema({
//     row: {
//         type: Number,
//         required: true
//     },
//     number: {
//         type: Number,
//         required: true
//     },
//     reserved: {
//         type: Boolean,
//         default: false
//     },
//     owner: {
//         type: String,
//         default: ''
//     },
//     price: {
//         type: Number,
//         required: true,
//         default: 0,
//         min: 0
//     }
// }, {
//     timestamps: true,
//     toJSON: {
//         virtuals: true,
//         transform: function (doc, ret) {
//             ret.id = ret._id;  // הוספת id כשדה נוסף
//             return ret;
//         }
//     }
// });

// // אינדקס ייחודי למניעת כפילויות
// seatSchema.index({ row: 1, number: 1 }, { unique: true });

// const Seat = mongoose.model('Seat', seatSchema);

// export default Seat;