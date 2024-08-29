const users = require('../Model/userModel');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    console.log("Inside userController:register function");
    const { username, password, email } = req.body;
    console.log('Username:', username);
    console.log('Password:', password);

    try {
        const existingUser = await users.findOne({ email: email });
        console.log("Existing user:");
        console.log(existingUser);

        if (existingUser) {
            res.status(406).json('Account already exists, please login');
        } else {
            const newUser = new users({
                username: username,
                password: password, // Consider hashing passwords
                email: email
            });

            await newUser.save();
            res.status(200).json("Registration request received successfully");
        }
    } catch (err) {
        console.error('Registration request failed due to:', err);
        res.status(500).json('Registration request failed due to an error');
    }
};

exports.login = async (req, res) => {
    console.log("Inside login controller function");
    const { username, password, email } = req.body;
    console.log('Username:', username);
    console.log('Password:', password);

    try {
        const existingUser = await users.findOne({ email: email, password: password });
        console.log("Existing user found:", existingUser);

        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, 'supersecretkey123456', { expiresIn: '1h' });
            console.log('Generated token:', token);

            res.status(200).json({
                existingUser,
                token
            });
        } else {
            res.status(406).json("Invalid email ID or password");
        }
    } catch (err) {
        console.error('Login request failed due to:', err);
        res.status(500).json('Login request failed due to an error');
    }
};

exports.getallUsers = async (req, res) => {
    try {
        const allUsers = await users.find();
        res.status(200).json(allUsers);
    } catch (error) {
        console.error('Request failed due to:', error);
        res.status(500).json('Request failed due to an error');
    }
};
