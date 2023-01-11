// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  } else {
    const proposals = await prisma.proposal.findMany({})
    res.status(200).json(proposals);
    // res.status(200).json({ name: "John Doe" });
  }
}
