const express = require('express');
const router = express.Router();
const usersService = require('../services/usersService');

router.post('', async (req, res) => {
    const { status, response } = await usersService.create(req.body);
    return res.status(status).send(response)
});

router.get('', async (req, res) => {
    const {status, response} = await usersService.getAll();
    return res.status(status).send(response); 
});

module.exports = router;