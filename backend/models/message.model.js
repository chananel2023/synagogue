import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

    text: {
        type: String,
        required: true,
        minlength: 1
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
export default Message;
