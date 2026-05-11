const express = require("express");
const apiRoutes = require("./routes/routes");

require("dotenv").config();
require('./db-connection/db-connection');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Running Express server on port ${PORT}`);
});