require('dotenv').config();
const express = require("express")
const connectDB = require("./config/db")
const user = require("./models/userModel");
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const PORT = 3000;
const helmet = require("helmet");
const { generalLimiter, authLimiter } = require('./middlewares/rateLimitter');

connectDB();

app.use(express.json());
app.use("/public", express.static("public"));
app.use(helmet());
app.user(generalLimiter);

app.use("/api/admin/users", require("./routes/userRoutes"));
app.use("/api/users", require("./routes/userAuthRoutes"));

app.get('/', (req, res) => {
    res.send("Hello World")
});

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});