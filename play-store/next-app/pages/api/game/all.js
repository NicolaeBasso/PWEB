import prisma from "../../../lib/prisma"

export default async function handle(req, res) {
  if(req.method === 'GET') {
    const game = await prisma.game.findMany();

    res.json(game)
  }
}

