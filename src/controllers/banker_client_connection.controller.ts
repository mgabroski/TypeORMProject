import express from "express";
import { FindOneOptions } from "typeorm";

import { Banker } from "../entities/Banker";
import { Client } from "../entities/Client";

export const bankerClientConnection = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { bankerId, clientId } = req.params;

  const bankerOption: FindOneOptions<Banker> = {
    where: {
      id: parseInt(bankerId),
    },
  };
  const banker = await Banker.findOne(bankerOption);

  const clientOption: FindOneOptions<Client> = {
    where: {
      id: parseInt(clientId),
    },
  };
  const client = await Client.findOne(clientOption);

  if (!banker || !client) {
    return res.json({
      msg: "Banker or client not found",
    });
  }

  banker.clients = [client];

  await banker.save();

  return res.json({
    msg: "banker connected to client",
  });
};
