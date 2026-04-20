const express = require("express");
const apiRoutes = require("./routes/routes");
const viewRoutes = require("./routes/viewRoutes");
const session = require('express-session');
const passport = require('passport');

require("dotenv").config();
require('./db_connection/db_connection');
require('./passport/passport-config')(passport);

const app = express();
const PORT = process.env.PORT;

app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRoutes);
app.use('/', viewRoutes);

app.listen(PORT, () => {
    console.log(`Running Express server on port ${PORT}`);
});