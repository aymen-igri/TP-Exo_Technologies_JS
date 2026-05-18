const mongoose = require("mongoose");
require("dotenv").config();

main().catch((err) => console.log(err));

async function main() {
    const response = await mongoose.connect(process.env.DB_URL+"/express_project");
    if (response) console.log("Connected to DB" );
    else console.log("Failed to connect to DB");
}