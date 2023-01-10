import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { requestUserId } = req.body;
    const tokenString = req.headers.authorization?.split(" ")[1] ?? "";

    jwt.verify(tokenString, "SECRET", (err: any, decoded: any) => {
      if (requestUserId === decoded.id) next();

      if (err || requestUserId !== decoded.id) {
        return res.status(401).send({ detail: "Invalid token, please log out, then login again!" });
      }
    });
  } catch (error) {
    return res.status(401).send({ detail: "Invalid token, please log out, then login again!" });
  }
};
