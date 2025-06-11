import mongoose from "mongoose"

export const connectDb = async () => {
    try {
        console.log("MONGO_URI:", process.env.MONGO_URI);
        await mongoose.connect('mongodb://localhost:27017/Paytm_backend');
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1); // Optional: exit the app on failure
    }
};