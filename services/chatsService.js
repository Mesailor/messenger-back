const { Chat, validateChat } = require('../models/chats');
const validateMessage = require('../models/messages').validate;
const EventEmitter = require('node:events');

const emitter = new EventEmitter();

class ChatsService {
    async getAll(userId) {
        const chats = await Chat.find({ users: userId });
        return {
            status: 200,
            response: chats
        }
    }

    async getOne(chatId) {
        try {
            const chat = await Chat.findById(chatId);
            return {
                status: 200,
                response: chat
            }
        } catch (e) {
            console.log(e)
            return {
                status: 400,
                response: { text: "This chat does not exist!" }
            }
        }
    }

    async create(chat, userId) {
        const { value, error } = validateChat(chat);
        if (error) {
            console.log(error.details[0].message);
            return {
                status: 400,
                response: { text: "Chat name is required!" }
            }
        }

        if (!value.users.includes(userId)) {
            value.users.push(userId);
        }

        const newChat = new Chat({
            name: value.name,
            users: value.users,
            messages: []
        });

        await newChat.save();
        return {
            status: 200,
            response: newChat
        }
    }

    async addMessage(chatId, message) {
        try {
            var chat = await Chat.findById(chatId);
            if (!chat) {
                return {
                    status: 400,
                    response: { text: 'Chat does not exist!' }
                }
            }
        } catch (e) {
            console.log(e);
            return {
                status: 500,
                response: { text: "Something went wrong!"}
            }
        }

        const { value, error } = validateMessage(message);
        if (error) {
            console.log(error.details[0].message)
            return {
                status: 400,
                response: { text: "Invalid message!"}
            }
        }

        const newMessage = {
            author: value.author,
            text: value.text
        }
        let messages = chat.messages;
        messages.push(newMessage);
        chat.set("messages", messages);
        await chat.save();

        return {
            status: 200,
            response: ''
        }
    }
}

module.exports = new ChatsService();