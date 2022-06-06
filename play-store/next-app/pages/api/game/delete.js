import prisma from "../../../lib/prisma"

export default async function handle(req, res) {  
  const {id} = req.body

  if(req.method === 'DELETE') {
    const game = await prisma.game.findUnique({
      where: {
        id
      }
    })

    if(!game) {
      res.status(400).send("Game with such an id does not exist")
    } else {
      const game = await prisma.game.delete({
        where: {
          id
        }
      });

      res.json(game)
    }
  }
}

