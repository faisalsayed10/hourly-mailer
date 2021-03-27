// Login route

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";
import bcrypt from "bcryptjs";
import withSession from "@lib/session";
import { Session } from "next-iron-session";

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) return res.status(404).json({ message: "User not found" });
      const passwordIsValid = await bcrypt.compare(password, user.password);

      if (!passwordIsValid) {
        return res.status(403).json({ password: "Password is incorrect" });
      }

      delete user.password;

      req.session.set("user", user);
      await req.session.save();

      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }
);
