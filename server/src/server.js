require("dotenv").config();

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
    });

};

startServer();