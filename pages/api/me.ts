// GET route: Get the authenticated user details

import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import withSession from "@lib/session";
import prisma from "@lib/prisma";

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    const user: User = await req.session.get("user");
    if (!user)
      return res.status(400).json({ message: "You are not logged in" });

    const userWithMoreDetails = await prisma.user.findUnique({
      where: { id: user.id },
      include: { lists: true },
    });

    delete userWithMoreDetails.password;

    return res.json(userWithMoreDetails);
  }
);
