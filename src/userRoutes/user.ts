import express, { Request, Response } from 'express';
import {User} from '../Schema/index.js';
import { signUp,signin } from '../controller/user-controller.js';
const UserRouter: express.Router = express.Router();

UserRouter.post('/sign-up', (req, res, next) => {
	signUp(req, res ).catch(next);
});

UserRouter.post('/sign-in', async (req: Request, res: Response, next) => {
    signin(req, res).catch(next);
});



export default UserRouter;
