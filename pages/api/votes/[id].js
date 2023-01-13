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
      const data = await prisma.vote.findMany({
        where: {
          proposalId: id,
        },
      });
      res.status(200).json(data);
      return;
    }
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  } else {
    const { id } = req.query;
    const value = parseInt(req.body);
    // Verify if the user has already voted
    const votes = await prisma.vote.findMany({
      where: {
        userId: session.user.id
      }
    })
    votes.map((vote) => {
      if (vote.proposalId == id) {
        res.status(400).json({ message: "You have already voted." });
        return;
      }
    })
    const newVote = await prisma.vote.create({
      data: {
        value: value,
        proposal: {
          connect: {
            id: id,
          },
        },
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    res.status(200).json(newVote);
   
    // res.status(200).json({data});
  }
}
