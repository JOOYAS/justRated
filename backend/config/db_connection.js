const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

const dbConnect = async () => {
    try {
        await mongoose.connect(uri);
        // await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("👍MongoDB connection successful!");
    } catch (err) {
        console.error("❌MongoDB connection failed:", err);
    }
}

module.exports = dbConnect;