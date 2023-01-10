import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class DeleteUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.body;

    try {
      const data = await prismaClient.user.delete({ where: { id } });
      res.status(200).send({
        title: `Information's from ${data.name} deleted successfully.`,
        status: 200,
        detail: `Information's from ${data.name} deleted successfully.`,
      });
    } catch (error) {
      return res.status(401).send({
        title: "Generic Error",
        status: 401,
        detail: error,
      });
    }
  }
}
