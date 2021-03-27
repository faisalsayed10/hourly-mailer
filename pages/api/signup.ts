// Signup route

import { NextApiRequest, NextApiResponse } from "next";
import { validateSignupData } from "@lib/validators";
import bcrypt from "bcryptjs";
import prisma from "@lib/prisma";
import withSession from "@lib/session";
import { Session } from "next-iron-session";

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    try {
      const { username, email, password, confirmPassword } = req.body;
      const { valid, errors } = validateSignupData({
        username,
        email,
        password,
        confirmPassword,
      });
      const userAlreadyExists = await prisma.user.findMany({
        where: {
          OR: [
            {
              email,
            },
            {
              username,
            },
          ],
        },
      });

      if (!valid) return res.status(400).json(errors);

      if (userAlreadyExists[0]?.id)
        return res
          .status(400)
          .json({ message: "User with this username/email already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role: "USER",
        },
      });

      delete user.password;

      req.session.set("user", user);
      await req.session.save();

      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
);
