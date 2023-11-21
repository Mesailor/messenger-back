const express = require('express');
const router = express.Router();
const chatsService = require('../services/chatsService');
const EventEmitter = require('node:events');
const emitter = new EventEmitter();

router.post('/', async (req, res) => {
    const { status, response } = await chatsService.create(req.body.chat, req.body.id);
    return res.status(status).send(response);
});

router.get('/', async (req, res) => {
    const { status, response } = await chatsService.getAll(req.body.id);
    return res.status(status).send(response);
});

router.get('/:id', async (req, res) => {
    const { status, response } = await chatsService.getOne(req.params.id);
    return res.status(status).send(response);
});

router.get('/:id/getmessage', (req, res) => {
    emitter.once(`newMessIn${req.params.id}`, (message) => {
        return res.send(message);
    });
});

router.post('/:id/newmessage', async (req, res) => {
    const { status, response } = await chatsService.addMessage(req.params.id, req.body.message);
    emitter.emit(`newMessIn${req.params.id}`, req.body.message);
    return res.status(status).send(response);
});

module.exports = router;