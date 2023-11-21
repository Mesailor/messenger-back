const express = require('express');
const { configKeys } = require('../config_imported');
const router = express.Router();
const authService = require('../services/authService');

router.post('/', async (req, res) => {
    // const token = await Authentication(req.body.name, req.body.password);

    // if (!token) {
    //     return res.status(400).send({ text: "Wrong name or pass!" });
    // } else {
    //     return res.append('x-auth-token', token).send({ token: token });
    // }
    const { status, response } = await authService.checkLogin(req.body.name, req.body.password);
    return res.status(status).send(response);
});

// async function Authentication(name, password) {
//     const user = await User.find({ name });
//     if (!user) {
//         return false;
//     }
//     if (!(user.password === password)) {
//         return false;
//     }
//     return createJwtToken(user);
// }

// function createJwtToken(user) {
//     const payload = {
//         id: user._id,
//         name: user.name,
//         password: user.password
//     }

//     return jwt.sign(payload, 'jwtPrivateKey');
// }

module.exports.authRouter = router;
// module.exports.createJwtToken = createJwtToken; 
