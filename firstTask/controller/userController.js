var db = require('./../models');
var User = db.user;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var addUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and send a JWT token
        const userToken = jwt.sign(username, 'my-secret-here-for-token');

        // Create a new user
        await User.create({ name: username, email: email, password: hashedPassword, token: userToken });
        res.json({ message: 'User registered successfully', data: { userToken } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

var login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user in the database
        const findUser = await User.findOne({ where: { email: username } });

        // Check if the user exists
        if (!findUser) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, findUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        // const checkToken = jwt.verify(findUser.token, 'my-secret-here-for-token')
        // console.log(checkToken)
        // if(!checkToken){
        //     return res.status(401).json({ error: 'Invalid username or password' });
        // }
        res.send('Loggged In');

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addUser,
    login
}