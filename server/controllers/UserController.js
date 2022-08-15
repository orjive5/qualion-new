const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/User');

const register = async (req, res) => {
    try {
        const passwordRaw = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(passwordRaw, salt)

        const doc = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: passwordHash,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '2h'
            }
        );

        const { password, ...userData } = user._doc;

        res.json({
            ...userData,
            token
        });
    } catch (err) {
        res.json({
            message: 'Registration failed!'
        })
    }
}

const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: 'Incorrect user or password!'
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.password);
        if (!isValidPass) {
            return res.status(400).json({
                message: 'Incorrect user or password!'
            })
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '2h',
            },
        )

        const { password, ...userData } = user._doc;

        res.json({
            ...userData,
            token
        });
    } catch (err) {
        res.status(500).json({
            message: 'Login failed!',
        })
    }
}

module.exports = {
    register,
    login,
}