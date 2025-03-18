import 'dotenv/config';
import mongoose from 'mongoose';

const connectionDB = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is not defined in the environment variables.");
        }

        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

export default connectionDB;
