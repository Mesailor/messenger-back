const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

router.post('/', async (req, res) => {
    const name = req.body.name.toLowerCase();
    const password = req.body.password;

    const { status, response } = await authService.checkLogin(name, password);
    return res.status(status).send(response);
});

module.exports.authRouter = router;