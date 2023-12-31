const jwt = require('jsonwebtoken');
const authService = require('../services/authService');

module.exports = async function (req, res, next) {
    // const token = req.get('Authorization').split(' ')[1];
    const token = req.get('x-auth-token')

    const decoded = await authService.verify(token);

    if (!decoded) {
        return res.status(401).send({ text: "Unauthorized!"});
    }

    req.body.id = decoded.id;
    if (req.body.message) {
        req.body.message.author = decoded.name;
    } else {
        req.body.user = decoded.name;
    }
    next();
}