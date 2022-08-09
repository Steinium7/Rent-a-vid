const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next){
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send("Token not sent ...");

    try {
        const user = jwt.verify(token, config.get('jwtKey'));
        req.user = user;
        next();
    } catch (error) {
         return res.status(401).send("Invalid Token");
    }
}