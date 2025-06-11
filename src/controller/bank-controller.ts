import mongoose from "mongoose";
import {Bank} from "../Schema/bankSchema";
import { Request, Response } from "express";

export const tranferFunds = async(req: Request, res: Response,) => {{

    //descreement the amount from the sender's account
    const senderAccount = await Bank.findByIdAndUpdate( 
        req.body.senderAccountId, 
        { $inc: { balance: -req.body.amount } }, 
        { new: true }
    );

    await Bank.findByIdAndUpdate(
        req.body.receiverAccountId,
        { $inc: { balance: req.body.amount } },
        { new: true }
    );
    res.status(200).json({
        message: "Funds transferred successfully",
        senderAccount,
    });
}
}


// What if the database crashes right after the first request (only the balance is decreased for one user, and not for the second user)
// What if the Node.js crashes after the first update?

// It would lead to a database inconsistency. Amount would get debited from the first user, and not credited into the other users account.

// If a failure ever happens, the first txn should rollback.

// This is what is called a transaction in a database. We need to implement a transaction on the next set of endpoints that allow users to transfer INR