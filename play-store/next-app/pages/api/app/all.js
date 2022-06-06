import prisma from "../../../lib/prisma"

export default async function handle(req, res) {
  if(req.method === 'GET') {
    const app = await prisma.app.findMany();

    res.json(app)
  }
}

