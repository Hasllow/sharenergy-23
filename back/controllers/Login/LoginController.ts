import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prismaClient } from "../../database/prismaClient";

interface Admin {
  id: string;
  username: string;
  password: string;
}

export class LoginController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const admin: Admin | null = await prismaClient.admin.findUnique({ where: { username: username } });

      if (!admin) {
        return res.status(401).json({
          type: "/errors/incorrect-user-pass",
          title: "Usuário ou senha inválidos.",
          status: 401,
          detail: "Autenticação falhou devido a username ou senha inválidos.",
        });
      }

      const validPassword = await bcrypt.compare(password, admin.password);

      if (!validPassword) {
        return res.status(401).json({
          type: "/errors/incorrect-user-pass",
          title: "Usuário ou senha inválidos.",
          status: 401,
          detail: "Autenticação falhou devido a username ou senha inválidos.",
        });
      }

      const token = jwt.sign({ id: admin.id }, "SECRET", { expiresIn: "3d" });
      return res.status(200).json({
        title: "Login realizado com sucesso.",
        status: 200,
        data: {
          idLoggedUser: admin.id,
          token,
        },
      });
    } catch (error) {
      return res.status(401).json({
        title: "Generic Error",
        status: 401,
        detail: error,
      });
    }
  }
}
