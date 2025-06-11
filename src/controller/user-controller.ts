import { Request, Response, NextFunction } from 'express';
import { User } from '../Schema/index.js';
import Jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';
import { Bank } from '../Schema/bankSchema.js';

// JWT Auth Middleware
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = Jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid signUp called' });
    }
};

export const signUp = async (req: Request, res: Response) => {
    const { email, password, username, firstName, lastName } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // In production, use bcrypt to hash passwords!
        const newUser = new User({
            email,
            password, // Store hashed password in production!
            username,
            firstName,
            lastName
        });
        await newUser.save();
        const userId = newUser._id;
        await Bank.create({
            userId,
            balance: 1 + Math.random() * 10000
        });
        res.status(201).json({ message: 'User signed up successfully', email });
    } catch (error) {
        console.error('SignUp Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password }); // Use hashed password in production!
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        // Generate JWT token
        const token = Jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'User signed in successfully', email, token,  });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};