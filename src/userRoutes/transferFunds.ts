import express, { Request, Response } from 'express';
import { tranferFunds } from '../controller/bank-controller';
const TranferRouter: express.Router = express.Router();

TranferRouter.post('/sign-up', (req, res, next) => {
    tranferFunds(req, res ).catch(next);
});




export default TranferRouter;
