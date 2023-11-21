const { User, validate } = require('../models/users');
const authService = require('./authService');

class UserService {
    async create(user) {
        const { value, error } = validate(user);
        if (error) {
            console.log(error.details[0].message);
            return {
                status: 400,
                response: { text: "Wrong input!" }
            };
        }

        const users = await User.find({ name: value.name });
        if (users[0]) {
            return {
                status: 400,
                response: { text: "User already exist" }
            };
        }

        const newUser = new User({
            name: value.name,
            password: value.password
        });
        await newUser.save();

        const token = authService.createJwtToken(newUser);
        return {
            status: 200,
            response: { token }
        };
    }

    async getAll() {
        const users = await User.find();
        return {
            status: 200,
            response: users
        }
    }
}

module.exports = new UserService();