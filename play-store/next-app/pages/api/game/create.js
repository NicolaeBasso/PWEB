import prisma from "../../../lib/prisma"

export default async function handle(req, res) {  
  const {name, genre, description, creator} = req.body

  if(req.method === 'POST') {
    const game = await prisma.game.findFirst({
      where: {
        name
      }
    })

    if(game) {
      res.status(400).send("Game with such a name already exists")
      res.json(game)
    } else {
      const game = await prisma.game.create({
        data: {
          name,
          genre, 
          description,
          creator
        }
      });

      res.status(201).json(game)
    }
  }
}

