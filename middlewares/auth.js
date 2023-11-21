const jwt = require('jsonwebtoken');
const { configKeys } = require('../config_imported');

module.exports = function (req, res, next) {
    const token = req.get('Authorization').split(' ')[1];

    try {
        var decoded = jwt.verify(token, configKeys.jwtPrivateKey);

        // check: is decoded user exist?
        // if (not exist) {}
    } catch (e) {
        return res.status(400).send(e);
    }

    req.body.id = decoded.id;
    if (req.body.message) {
        req.body.message.author = decoded.name;
    } else {
        req.body.user = decoded.name;
    }
    next();
}