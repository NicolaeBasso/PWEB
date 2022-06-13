import prisma from "../../../lib/prisma"
import { getToken } from "next-auth/jwt"

export default async function handle(req, res) {
  if (req.method === 'GET') {
    const allGames = await prisma.game.findMany();

    const token = await getToken({ req, encryption: true })

    if (token && token.role !== 3)
      return res.json(allGames)

    res.json(allGames.map((el) => { el.url = null; return el; }))
  }
}

