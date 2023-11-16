const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/users');
const { createJwtToken } = require('../routers/auth');

router.post('', async (req, res) => {
    const { value, error } = validate(req.body);
    if (error) {
        return res.status(400).send({ text: "Wrong input!" });
    }

    const user = {
        name: value.name.toLowerCase(),
        password: value.password
    }

    const users = await User.find({ name: user.name });
    if (users[0]) {
        return res.status(400).send({ text: "User already exist" });
    }

    const newUser = new User({
        name: user.name,
        password: user.password
    });
    await newUser.save();

    const token = createJwtToken(newUser);
    return res.send({ token });
});

router.get('', async (req, res) => {
    const users = await User.find();
    return res.send(users);
});

module.exports = router;