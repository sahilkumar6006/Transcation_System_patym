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
exports.signin = exports.signUp = void 0;
const index_js_1 = require("../Schema/index.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_js_2 = require("../config/index.js");
// username: String,
// password: String,
// firstName: String,
// lastName: String
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username, firstName, lastName } = req.body;
    try {
        // Check if user already exists
        const existingUser = yield index_js_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // Create a new user
        const hashpassword = jsonwebtoken_1.default.sign(password, index_js_2.JWT_SECRET); // Hash the password before saving (use a proper hashing function in production)
        const newUser = new index_js_1.User({
            email,
            hashpassword,
            username,
            firstName,
            lastName
        });
        index_js_1.User.create(newUser);
        // Save the user to the database
        // await newUser.save(); // Uncomment this line if using Mongoose
        yield newUser.save();
        res.status(201).json({ message: 'User signed up successfully', email });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.signUp = signUp;
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = yield index_js_1.User.find({ email, password });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        // Verify the password (use a proper hashing function in production)
        const isPasswordValid = jsonwebtoken_1.default.verify(password, index_js_2.JWT_SECRET);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        // Generate a JWT token (optional, if you want to use JWT for authentication)
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'User signed in successfully', email });
});
exports.signin = signin;
