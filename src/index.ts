import express from 'express';
import path from 'path';
import dotenv from "dotenv";
import {connectDb} from './db';

import  UserRouter  from './userRoutes/user';
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1',UserRouter);

connectDb();
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})