import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class CreateAdminController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      await prismaClient.$connect();

      const salt = await bcrypt.genSalt(10);
      const passwordHashed = await bcrypt.hash(password, salt);
      await prismaClient.admin.create({ data: { username: username, password: passwordHashed } });
      await prismaClient.$disconnect();
      return res
        .status(200)
        .json({ title: "Cadastro Realizado com Sucesso", status: 200, detail: "Cadastro Realizado com Sucesso" });
    } catch (error) {
      return res.status(401).json({
        title: "Generic Error",
        status: 401,
        detail: error,
      });
    }
  }
}
