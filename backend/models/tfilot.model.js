import mongoose from 'mongoose';

const tfilotSchema = new mongoose.Schema({
    tfila: {
        type: String,
        required: true
    },
    time: {
        type: String,  // שעה בתצורת "HH:mm"
        required: true
    }
});

const Tfilot = mongoose.model('Tfilot', tfilotSchema);
export default Tfilot;
