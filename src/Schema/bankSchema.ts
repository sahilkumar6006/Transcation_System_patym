import mongoose from "mongoose";
import { Schema } from "mongoose";

const bankSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true
    },
    // If you are using ObjectId, you can import it from mongoose
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    accountHolderName: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    ifscCode: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export const Bank = mongoose.model('Bank', bankSchema);