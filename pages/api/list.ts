import { User } from "@prisma/client";
import withSession from "@lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import prisma from "@lib/prisma";

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    const { id }: User = await req.session.get("user");
    if (!id) return res.status(400).json({ message: "You are not logged in" });

    switch (req.method) {
      case "GET":
        const lists = await prisma.list.findMany({
          where: {
            userId: id,
          },
          include: { emails: true }
        });

        return res.json(lists);
      case "POST":
        const { name } = req.body;

        const list = await prisma.list.create({
          data: { name, userId: id },
        });

        return res.status(200).json(list);
      default:
        return res.status(405).end();
    }
  }
);
