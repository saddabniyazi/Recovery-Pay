require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    const isDbConnected = await connectDB();

    if (!isDbConnected) {
        console.warn(" Starting server without MongoDB connection");
    }

    app.listen(PORT, () => {
        console.log(` Server running on http://localhost:${PORT}`);
         console.log("Mongoose Ready State:", mongoose.connection.readyState);
    });

};

startServer();