"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = require("../utils/generateToken");
const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ message: 'Missing fields' });
    const exist = await User_1.default.findOne({ email });
    if (exist)
        return res.status(400).json({ message: 'Email exists' });
    const hashed = await bcryptjs_1.default.hash(password, 10);
    const user = await User_1.default.create({ name, email, password: hashed });
    res.json({ user: { id: user._id, name: user.name, email: user.email }, token: (0, generateToken_1.generateToken)(user._id.toString()) });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User_1.default.findOne({ email });
    if (!user)
        return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcryptjs_1.default.compare(password, user.password);
    if (!match)
        return res.status(400).json({ message: 'Invalid credentials' });
    res.json({ user: { id: user._id, name: user.name, email: user.email }, token: (0, generateToken_1.generateToken)(user._id.toString()) });
};
exports.login = login;
