import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import cleanUser from "./helpers/cleanUser";
import { UserType } from "./types/UserType";

export class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { user } = req.body;
    const userClean: UserType = cleanUser(user);
    const { id, name, email, cpf, phone, address } = userClean;

    try {
      const data = await prismaClient.user.update({
        where: { id },
        data: { name, email, cpf, phone, address },
      });

      res.status(200).send({
        title: `Information's from ${userClean.name} updated successfully.`,
        status: 200,
        detail: `Information's from ${userClean.name} updated successfully.`,
      });
    } catch (error) {
      return res.status(401).send({
        title: "Generic Error",
        status: 401,
        detail: { error },
      });
    }
  }
}
