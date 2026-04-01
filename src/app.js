const express = require("express")
const connectDB = require("./config/db")
const user = require("./models/userModel")
const app  = express();
const PORT = 3000;

connectDB();

app.use(express.json());
app.use("/public", express.static("public"));

app.use("/api/users", require("./routes/userRoutes"));

app.get('/', (req, res) => {
    res.send("Hello World")
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});