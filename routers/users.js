const express = require('express');
const router = express.Router();
const usersService = require('../services/usersService');
// const { User, validate } = require('../models/users');
// const { createJwtToken } = require('../routers/auth');

router.post('', async (req, res) => {
    // const { value, error } = validate(req.body);
    // if (error) {
    //     console.log(error.details[0].message);
    //     return res.status(400).send({ text: "Wrong input!" });
    // }

    // const users = await User.find({ name: value.name });
    // if (users[0]) {
    //     return res.status(400).send({ text: "User already exist" });
    // }

    // const user = new User({
    //     name: value.name,
    //     password: value.password
    // });
    // await user.save();

    // const token = createJwtToken(user);
    // return res.send({ token });
    const { status, response } = await usersService.create(req.body);
    return res.status(status).send(response)
});

router.get('', async (req, res) => {
    // const users = await User.find();
    // return res.send(users);
    const {status, response} = await usersService.getAll();
    return res.status(status).send(response); 
});

module.exports = router;