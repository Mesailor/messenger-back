const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const usersRouter = require('./routers/users');
const { authRouter } = require('./routers/auth');
const chatsRouter = require('./routers/chats');
const auth = require('./middlewares/auth');

const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/chats', auth, chatsRouter);

mongoose.connect('mongodb://193.233.232.74:8000/messenger')
    .then(() => {
        console.log('Connected to DB...')
    })
    .catch(() => {
        console.log('FAILED TO CONNECT TO DB!');
    });

app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}...`);
});