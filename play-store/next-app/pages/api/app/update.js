import prisma from "../../../lib/prisma"

export default async function handle(req, res) {
  const { id, name, category, description, creator } = req.body

  if (req.method === 'PUT') {
    const app = await prisma.app.findUnique({
      where: {
        id
      }
    })

    if (!app) {
      res.status(400).send("Such app does not exist")
    } else {
      const appUpdated = await prisma.app.update({
        where: {
          id
        },
        data: {
          name: name ?? app.name,
          category: category ?? app.category,
          description: description ?? app.description,
          creator: creator ?? app.creator,
        }
      })

      res.json(appUpdated)
    }
  }
}

