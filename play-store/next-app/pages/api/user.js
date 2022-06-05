import prisma from "../../lib/prisma"

export default async function handle(req, res) {
  const posts = await prisma.user.findMany()
  res.json(posts)
}