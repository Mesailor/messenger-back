const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');
const usersRouter = require('./routers/users');
const { authRouter } = require('./routers/auth');
const chatsRouter = require('./routers/chats');
const auth = require('./middlewares/auth');

const port = config.get('port') || 5000;
const dbConfig = config.get('dbConfig');

app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/chats', auth, chatsRouter);

mongoose.connect(`mongodb://${dbConfig.host}/messenger`)
    .then(() => {
        console.log('Connected to DB...')
    })
    .catch(() => {
        console.log('FAILED TO CONNECT TO DB!');
    });

app.listen(port, () => {
    console.log(`Listen on port ${port}...`);
});