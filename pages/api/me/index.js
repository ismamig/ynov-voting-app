// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  if (req.method !== "POST") {
    if (req.method === "GET") {
      const { id } = req.query;
      const data = await prisma.user.findUnique({
        where: {
          id: session.user.id
        },
        include: {
            votes: {
                include: {
                    proposal: true
                }
            }
        }
      });
      res.status(200).json(data);
      return;
    }
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  } else {
    res.status(200).json({ message: "POST REQUEST"});
  }
}
