import prisma from "../../../lib/prisma"

export default async function handle(req, res) {
  if(req.method === 'GET') {
    const {id} = {...req.body}

    const app = await prisma.app.findUnique({
      where: {
        id
      }
    })

    if(app) 
      res.json(app)
    else  
      res.status(404).send("No such app found")
  }
}

