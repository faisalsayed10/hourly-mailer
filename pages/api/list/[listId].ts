// List delete route

import { User } from ".prisma/client";
import withSession from "@lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import prisma from "@lib/prisma";

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    const { id }: User = await req.session.get("user");
    if (!id) return res.status(400).json({ message: "You are not logged in" });

    switch (req.method) {
      case "DELETE":
        try {
          const listId = req.query.listId as string;

          const list = await prisma.list.findMany({
            where: { id: listId, userId: id },
          });

          if (!list[0]?.id) return res.status(404).json({ message: "List not found" });

          const deleteLists = prisma.list.deleteMany({
            where: { id: listId, userId: id },
          });
          const deleteListEmails = prisma.email.deleteMany({
            where: { listId },
          });

          const transaction = await prisma.$transaction([
            deleteListEmails,
            deleteLists,
          ]);

          return res.status(200).json({ message: "List deleted successfully" });
        } catch (err) {
          console.error(err);
          return res.status(500).json({ message: err.message });
        }
      default:
        return res.status(405).end();
    }
  }
);
