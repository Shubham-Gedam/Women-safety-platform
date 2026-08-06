import mongoose from "mongoose";


 async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("User-service Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connectToDB;   