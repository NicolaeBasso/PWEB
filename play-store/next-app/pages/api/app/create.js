import prisma from "../../../lib/prisma"

export default async function handle(req, res) {  
  const {name, category, description, creator} = req.body

  if(req.method === 'POST') {
    const app = await prisma.app.findFirst({
      where: {
        name
      }
    })

    if(app) {
      res.status(400).send("app with such a name already exists")
      res.json(app)
    } else {
      const app = await prisma.app.create({
        data: {
          name,
          category, 
          description,
          creator
        }
      });

      res.status(201).json(app)
    }
  }
}

