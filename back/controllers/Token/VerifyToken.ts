import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = async (req: Request, res: Response) => {
  const { tokenString, userId } = req.body.data ?? [];

  try {
    jwt.verify(tokenString, "SECRET", (err: any, decoded: any) => {
      if (userId === decoded.id) {
        return res.status(200).send({
          title: "Valid Token.",
          status: 200,
          data: { userId: decoded.id },
        });
      }

      if (err || userId !== decoded.id) {
        return res.status(401).send({
          type: "/errors/incorrect-user-pass",
          title: "Invalid Token.",
          status: 401,
          detail: "Autenticação falhou devido a token inválido.",
        });
      }
    });
  } catch (error) {
    return res.status(401).send({
      type: "/errors/incorrect-user-pass",
      title: "Invalid Token.",
      status: 401,
      detail: "Autenticação falhou devido a token inválido.",
    });
  }
};
