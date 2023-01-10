import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class GetUsersController {
  async handle(req: Request, res: Response) {
    try {
      const users = await prismaClient.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      return res.status(500).send({
        title: "Generic Error",
        status: 500,
        detail: error,
      });
    }
  }
}
