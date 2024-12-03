import Payment from '../models/payment.model.js';

// קבלת רשימת חובות
export const getDebts = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving payments', error });
  }
};

// הוספת חוב חדש
export const addDebt = async (req, res) => {
  const { userName, amount, dueDate, notes } = req.body;

  if (!userName || !amount || !dueDate) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newPayment = new Payment({
      userName,
      amount,
      dueDate,
      notes,
      status: 'לא שולם',
    });
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ message: 'Error adding payment', error });
  }
};

// מחיקת חוב לפי מזהה
export const deleteDebt = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPayment = await Payment.findByIdAndDelete(id);

    if (!deletedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting payment', error });
  }
};
