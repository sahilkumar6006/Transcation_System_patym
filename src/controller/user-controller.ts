

import { Request, Response } from 'express';
import { User } from '../Schema/index.js';
import Jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';
import { Bank } from '../Schema/bankSchema.js';


export const  signUp= async (req: Request, res: Response, next: unknown) => {
    console.log("signUp called", req.body);
    const { email, password, username, firstName,lastName } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashpassword = Jwt.sign(password, JWT_SECRET); 
        const newUser = new User({
            email,
            hashpassword,
            username,
            firstName,
            lastName
        });
        User.create(newUser);
        await newUser.save();
        const userId = newUser._id;
        await Bank.create({
        userId,
        balance: 1 + Math.random() * 10000
    })  
        
        res.status(201).json({ message: 'User signed up successfully', email });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const signin = async (req: Request, res: Response, next: unknown) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await User.find({ email , password });
        if (!user) {    
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        // Verify the password (use a proper hashing function in production)
        const isPasswordValid = Jwt.verify(password, JWT_SECRET);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        // Generate a JWT token (optional, if you want to use JWT for authentication)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'User signed in successfully', email });
}