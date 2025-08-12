const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

const dbConnect = async () => {
    try {
        await mongoose.connect(uri);
        console.log("👍MongoDB connection successful!");
    } catch (error) {
        console.error("❌MongoDB connection failed:", error);
    }
}

module.exports = dbConnect;