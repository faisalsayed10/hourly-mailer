import { User } from ".prisma/client";
import withSession from "@lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import prisma from "@lib/prisma";
import { queue } from "@lib/queue";

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    const { id }: User = await req.session.get("user");
    if (!id) return res.status(400).json({ message: "You are not logged in" });

    switch (req.method) {
      case "POST":
        const {
          addresses,
          listId,
        }: { addresses: string; listId: string } = req.body;

        let addressArr: string[] = addresses
          .split(",")
          .map((address) => address.trim().toLowerCase());

        const list = await prisma.list.findUnique({
          where: { id: listId },
          include: { emails: true },
        });

        if (!list || list.userId !== id)
          return res.status(404).json({ message: "List not found" });

        list.emails.forEach((email) => {
          addressArr = addressArr.filter(
            (address) => address !== email.address
          );
        });

        const uniqueEmailsArr: string[] = [...new Set(addressArr)];

        const data = uniqueEmailsArr.map((address: string) => {
          return { address, response: {}, listId };
        });

        await prisma.email.createMany({
          data: data,
          skipDuplicates: true,
        });

        uniqueEmailsArr.forEach(async (email) => {
          await queue.add(email, { email: email });
        });

        return res.status(200).json({ message: "Emails added successfully" });
      default:
        return res.status(405).end();
    }
  }
);
