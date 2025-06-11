import express, { Request, Response } from 'express';
import {User} from '../Schema/index.js';
import { signUp } from '../controller/user-controller.js';
const UserRouter: express.Router = express.Router();

UserRouter.post('/sign-up', (req, res, next) => {
	signUp(req, res, next).catch(next);
});

UserRouter.post('/sign-in', async (req: Request, res: Response, next) => {
});



export default UserRouter;
