import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path: '../.env'})

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.VITE_MONGO_URI);
		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		console.log("Error connecting to MONGODB", error.message);
		process.exit(1);
	}
};