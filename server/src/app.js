const authRoutes = require("./routes/auth.routes");
const subscriptionRoutes = require("./routes/subscription.routes");
const customerRoutes = require("./routes/customer.routes");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const protect = require("./middleware/auth.middleware");

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "RecoverPay Backend Running "
    });
});
app.get("/api/profile", protect, (req, res) => {

    res.json({
        success:true,
        message:"Protected Route Accessed",
        user:req.user
    });

});
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
module.exports = app;