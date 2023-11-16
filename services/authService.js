const { User } = require('../models/users');
const jwt = require('jsonwebtoken');

class AuthService {
    async checkLogin(name, password) {
        const user = await User.find({ name });
        if (!user) {
            return {
                status: 200,
                response: { text: "Wrong name or password!"}
            }
        }
        if (!(user.password === password)) {
            return {
                status: 200,
                response: { text: "Wrong name or password!"}
            }
        }
        return {
            status: 200,
            response: { token: createJwtToken(user)}
        }
    }

    async verify(token) {
        try {
            const decoded = jwt.verify(token, 'jwtPrivateKey');

            const user = await User.findById(decoded.id);
            if (!user) {
                return false;
            }

            return decoded;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    createJwtToken(user) {
        const payload = {
            id: user._id,
            name: user.name,
            password: user.password
        }
    
        return jwt.sign(payload, 'jwtPrivateKey');
    }
}

module.exports = new AuthService();