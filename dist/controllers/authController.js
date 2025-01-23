"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sequelize_1 = require("sequelize");
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User_1.default.findOne({
            where: {
                [sequelize_1.Op.or]: [{ email }, { username }]
            }
        });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const user = await User_1.default.create({ username, email, password });
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
        res.status(201).json({ token, user: { id: user.id, username: user.username, email: user.email, token } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during registration' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User_1.default.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isMatch = await user.validatePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during login' });
    }
};
exports.login = login;
