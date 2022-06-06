import prisma from "../../../lib/prisma"

export default async function handle(req, res) {  
  const {id} = req.body

  if(req.method === 'DELETE') {
    const app = await prisma.app.findUnique({
      where: {
        id
      }
    })

    if(!app) {
      res.status(400).send("app with such an id does not exist")
    } else {
      const app = await prisma.app.delete({
        where: {
          id
        }
      });

      res.json(app)
    }
  }
}

