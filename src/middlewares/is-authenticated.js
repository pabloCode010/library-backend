function isAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        next();
    }
    res.status(401).send("error");
}

module.exports = isAuthenticated;