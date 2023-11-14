const mongoose = require('mongoose');
const Joi = require('joi');

const messageSchema = new mongoose.Schema({
    author: {
        type: String,
        require: true
    },
    text: {
        type: String
    },
    chat: {
        type: mongoose.Schema.ObjectId,
        ref: "Chat"
    },
})

const Message = mongoose.model('Message', messageSchema);

function validate(message) {
    const schema = Joi.object({
        author: Joi.string().required(),
        text: Joi.string(),
    });

    return schema.validate(message);
}

module.exports.Message = Message;
module.exports.validateMessage = validate;