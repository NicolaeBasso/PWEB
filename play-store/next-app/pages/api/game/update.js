import prisma from "../../../lib/prisma"

export default async function handle(req, res) {  
  const {id, name, genre, description, creator} = req.body

  if(req.method === 'PUT') {
    const game = await prisma.game.findUnique({
      where: {
        id
      }
    })

    if(!game) {
      res.status(400).send("Such game does not exist")
    } else {
      const gameUpdated = await prisma.game.update({
        where: {
          id
        },
        data: {
          name: name ?? game.name,
          genre: genre ?? game.genre,
          description: description ?? game.description,
          creator: creator ?? game.creator,
        }
      })

      res.json(gameUpdated)
    }
  }
}

