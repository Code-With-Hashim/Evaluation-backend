const jwt = require('jsonwebtoken')
const requestIp = require('request-ip');


const SECRET_KEY = process.env.SECRET_KEY

const authentication = (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1]

    const decoded = jwt.verify(token, SECRET_KEY, function (err, decoded) {
        if (err) {
            res.status(404).send('Please login to access the endpoint')
        } else {
            return decoded
        }
    });


    if (decoded) {
        req.body.UserID = decoded.UserID
        next()
    } else {
        res.status(404).send('Please login to access the endpoint')
    }

}

const ipMiddleware = function (req, res, next) {
    const clientIp = requestIp.getClientIp(req);
    req.body.userIP = clientIp
    next();
};


module.exports = { authentication, ipMiddleware }