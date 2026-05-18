const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/routes");

require("dotenv").config();
require('./db_connection/db_connection');

const app = express();
const PORT = process.env.PORT;

// CORS configuration
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Running Express server on port ${PORT}`);
});