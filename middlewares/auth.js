const cookieName = 'USER_SESSION';
const jwt = require('jsonwebtoken');
const {SECRET} = require('../config/config');


module.exports = function () {
    return function (req, res, next) {
        let token = req.cookies[cookieName]
        if (token) {
            jwt.verify(token, SECRET, function (err, decoded) {
                if (err) {
                    res.clearCookie(cookieName);
                } else {
                    req.user = decoded;
                    res.locals.user = decoded;
                    res.locals.isAuthenticated = true;
                }
            })
        }
        next()
    }
}