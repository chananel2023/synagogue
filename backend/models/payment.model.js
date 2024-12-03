import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    notes: { type: String },
    status: { type: String, default: 'לא שולם' },
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
