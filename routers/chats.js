const express = require('express');
const EventEmitter = require('node:events');
const router = express.Router();
const { Chat, validateChat } = require('../models/chats');
const validateMessage = require('../models/messages').validate;


const emitter = new EventEmitter();

router.post('/', async (req, res) => {
    const { value, error } = validateChat(req.body.chat);
    if (error) {
        return res.status(400).send(`{"text": "Chat name is required!"}`);
    }

    if(!value.users.includes(req.body.id)) {
        value.users.push(req.body.id);
    }

    const chat = new Chat({
        name: value.name,
        users: value.users,
        messages: []
    });

    await chat.save();
    res.send(chat);
});

router.get('/', async (req, res) => {
    const chats = await Chat.find({users: req.body.id});
    res.send(chats);
});

router.get('/:id', async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
        return res.send(chat);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.get('/:id/getmessage', (req, res) => {
    emitter.once(`newMessIn${req.params.id}`, (message) => {
        return res.send(message);
    });
});

router.post('/:id/newmessage', async (req, res) => {
    try {
        var chat = await Chat.findById(req.params.id);
        if (!chat) {
            return res.status(400).send('Chat does not exist!');
        }
    } catch (e) {
        return res.status(400).send(e);
    }

    const {value, error} = validateMessage(req.body.message);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const newMessage =  {
        author: value.author,
        text: value.text
    }
    let messages = chat.messages;
    messages.push(newMessage);
    chat.set("messages", messages);
    await chat.save();

    emitter.emit(`newMessIn${req.params.id}`, newMessage);

    return res.sendStatus(200);
});

module.exports = router;