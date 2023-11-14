const mongoose = require('mongoose');
const Joi = require('joi');

const chatSchema = new mongoose.Schema({
    name: String,
    users: {
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }]
    },
    messages: [{
        author: String,
        text: {
            type: String,
            required: true
        }
    }]
});

const Chat = mongoose.model('Chat', chatSchema);

function validate(chat) {
    const schema = Joi.object({
        name: Joi.string(),
        users: Joi.array()
    });

    return schema.validate(chat);
}

module.exports.Chat = Chat;
module.exports.validateChat = validate;