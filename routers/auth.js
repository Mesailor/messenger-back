const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models/users');

router.post('/', async (req, res) => {
    const name = req.body.name.toLowerCase();
    const password = req.body.password;

    const user = await User.findOne({ name });
    if (!user) {
        return res.status(400).send({ text: "Wrong name or pass!" });
    }
    if (user.password !== password) {
        return res.status(400).send({ text: "Wrong name or pass!" });
    }

    const token = createJwtToken(user);
    return res.append('x-auth-token', token).send({ token: token });
});

function createJwtToken(user) {
    const jwtuser = {
        id: user._id,
        name: user.name,
        password: user.password
    }

    return jwt.sign(jwtuser, 'jwtPrivateKey');
}

module.exports.authRouter = router;
module.exports.createJwtToken = createJwtToken;
