import mongoose from "mongoose";
import { Schema } from "mongoose";

const bankSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export const Bank = mongoose.model('Bank', bankSchema);