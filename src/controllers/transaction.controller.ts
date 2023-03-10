import express from "express";

import { Transaction } from "../entities/Transaction";
import { FindOneOptions } from "typeorm";
import { Client } from "../entities/Client";
import { TransactionTypes } from "../models/transaction.model";

export const createTransaction = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { clientId } = req.params;
  const { type, amount } = req.body;
  
  const options: FindOneOptions<Client> = {
    where: {
      id: parseInt(clientId),
    },
  };
  const client = await Client.findOne(options);
  
  if (!client) {
    return res.json({
      msg: "client not found",
    });
  }

  const transaction = Transaction.create({
    amount,
    type,
    client,
  });

  await transaction.save();

  if (type === TransactionTypes.DEPOSIT) {
    client.balance = Number(client.balance) + amount;
  }
  if (type === TransactionTypes.WITHDROW) {
    client.balance = Number(client.balance) - amount;
  }

  await client.save();

  return res.json({
    msg: " transaction completed successfully",
  });
};
