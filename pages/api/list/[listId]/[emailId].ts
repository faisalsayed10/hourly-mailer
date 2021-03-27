// Email Delete Route

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
        const emailId = req.query.emailId as string;
        const listId = req.query.listId as string;

        await prisma.email.deleteMany({
          where: { id: emailId, listId },
        });

        return res.status(200).json({ message: "Email deleted successfully" });
      default:
        return res.status(405).end();
    }
  }
);
