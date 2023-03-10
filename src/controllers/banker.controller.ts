import express from "express";
import { Banker } from "../entities/Banker";

export const createBanker = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { firstName, lastName, email, cardNumber, employeeNumber } = req.body;
  const banker = Banker.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    employee_number: employeeNumber,
  });

  await banker.save();
  return res.json(banker);
};
