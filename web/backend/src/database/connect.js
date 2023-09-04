import mongoose from "mongoose";

export const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to database`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};