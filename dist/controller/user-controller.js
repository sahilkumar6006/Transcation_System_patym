"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signUp = exports.authenticateJWT = void 0;
const index_js_1 = require("../Schema/index.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_js_2 = require("../config/index.js");
const bankSchema_js_1 = require("../Schema/bankSchema.js");
// JWT Auth Middleware
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, index_js_2.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(403).json({ error: 'Invalid signUp called' });
    }
};
exports.authenticateJWT = authenticateJWT;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username, firstName, lastName } = req.body;
    try {
        const existingUser = yield index_js_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // In production, use bcrypt to hash passwords!
        const newUser = new index_js_1.User({
            email,
            password, // Store hashed password in production!
            username,
            firstName,
            lastName
        });
        yield newUser.save();
        const userId = newUser._id;
        yield bankSchema_js_1.Bank.create({
            userId,
            balance: 1 + Math.random() * 10000
        });
        res.status(201).json({ message: 'User signed up successfully', email });
    }
    catch (error) {
        console.error('SignUp Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.signUp = signUp;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield index_js_1.User.findOne({ email, password }); // Use hashed password in production!
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, index_js_2.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'User signed in successfully', email, token, });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.signin = signin;
