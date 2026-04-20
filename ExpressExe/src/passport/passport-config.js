const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/models');

module.exports = function(passport) {
    passport.use(new LocalStrategy(
        async (username, password, done) => {
            try {
                const user = await User.findOne({ username: username });
                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }
                
                if (user.password !== password) {
                    return done(null, false, { message: 'Incorrect password' });
                }
                
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));

    //Store user ID in the session cookie
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    //Retrieve user object from DB using the ID in the cookie
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};