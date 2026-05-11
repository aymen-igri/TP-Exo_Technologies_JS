function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); 
    }
    res.status(401).send("Unauthorized: Please log in to access this resource");
}

module.exports = { ensureAuthenticated };