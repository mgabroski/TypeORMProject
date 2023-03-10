import express from "express";
import { createQueryBuilder } from "typeorm";

import { Client } from "../entities/Client";
import { connectDB } from "../data-access/connection";

export const createClient = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { firstName, lastName, email, cardNumber, balance } = req.body;

  const client = Client.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    balance,
  });

  await client.save();
  return res.status(200).json(client);
};

export const deleteClient = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { clientId } = req.params;
  const response = await Client.delete(parseInt(clientId));

  return res.json(response);
};

export const getClients = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const clientRepository = connectDB.getRepository(Client);
    const clients = await clientRepository
      .createQueryBuilder("client")
      .select(["client.first_name", "client.last_name", "client.balance"])
      .leftJoinAndSelect("client.transactions", "transactions")
      .where(
        "client.balance >= :minBalance AND client.balance <= :maxBalance",
        {
          minBalance: 500,
          maxBalance: 10000,
        }
      )
      .getMany();

    return res.json(clients);
  } catch (error) {
    console.error(error);
    next(error);
  }
  return;
};
