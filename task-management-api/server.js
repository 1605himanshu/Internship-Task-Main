const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
