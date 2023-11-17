var db = require('./../models');
var User = db.user;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var addUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(401).json({ error: 'Please fill all the details!' });
        }
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

var updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.params);
        const { updatedEmail } = req.body;
        if (!id) {
            return res.status(401).json({ error: 'Please write a valid Email!' });
        }
        const findUser = await User.findOne({ where: { name: username } });

        if (!findUser) {
            return res.status(401).json({ error: 'User not found!' });
        }

        await findUser.update({ email: updatedEmail }, { where: { name: username } });
        return res.json({ message: 'User updating successfully' });
    }
    catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

var deleteUser = async (req, res) => {
    try {
        const { email } = req.params;
        if (!email) {
            return res.status(401).json({ error: 'Please write a valid Email!' });
        }
        const findUser = await User.findOne({ where: { email: email } });

        if (!findUser) {
            return res.status(401).json({ error: 'User not found!' });
        }

        await findUser.destroy();
        return res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    addUser,
    login,
    deleteUser,
    updateUser
}