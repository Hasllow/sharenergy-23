import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import cleanUser from "./helpers/cleanUser";
import { UserType } from "./types/UserType";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { user, requestUserId } = req.body;
    const userClean: UserType = cleanUser(user);

    try {
      await prismaClient.user.create({ data: { ...userClean } });
      res.status(200).send({
        title: `Information's from ${userClean.name} registered successfully.`,
        status: 200,
        detail: `Information's from ${userClean.name} registered successfully.`,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return res.status(401).send({
            title: "Generic Error",
            status: 401,
            detail: "There is a unique constraint violation, a new user cannot be created with this email",
          });
        }
      }

      return res.status(401).send({
        title: "Generic Error",
        status: 401,
        detail: "Generic Error",
      });
    }
  }
}
