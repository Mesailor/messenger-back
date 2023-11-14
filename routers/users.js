const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/users');
const { createJwtToken } = require('../routers/auth');

router.post('', async (req, res) => {
    const { value, error } = validate(req.body);
    if (error) {
        return res.status(400).send({ text: "Wrong input!" });
    }

    const users = await User.find({ name: value.name });
    if (users[0]) {
        return res.status(400).send({ text: "User already exist" });
    }

    const user = new User({
        name: value.name,
        password: value.password
    });
    await user.save();

    const token = createJwtToken(user);
    return res.send({ token });
});

router.get('', async (req, res) => {
    const users = await User.find();
    return res.send(users);
});

module.exports = router;