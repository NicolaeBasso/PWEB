import prisma from "../../../lib/prisma"

export default async function handle(req, res) {
  if(req.method === 'GET') {
    const {id} = {...req.body}

    const game = await prisma.game.findUnique({
      where: {
        id
      }
    })

    if(game) 
      res.json(game)
    else  
      res.status(404).send("No such game found")
  }
}

