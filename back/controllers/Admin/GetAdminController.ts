import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class GetAdminController {
  async handle(req: Request, res: Response) {
    await prismaClient.$connect();
    const allAdmins = await prismaClient.admin.findMany();
    await prismaClient.$disconnect();
    return res.status(200).json(allAdmins);
  }
}
