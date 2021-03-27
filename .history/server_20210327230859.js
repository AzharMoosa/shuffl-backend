const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

// Connect to Database
connectDB();

// CORS
app.use(cors());

// Middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.use("/api/users", require("./routes/users"));
app.use("/api/rooms", require("./routes/rooms"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
