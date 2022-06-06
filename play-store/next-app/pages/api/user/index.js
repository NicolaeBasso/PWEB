import prisma from "../../../lib/prisma"

export default async function handle(req, res) {
  if(req.method === 'GET') {
    const {email, password} = req.body

    const user = await prisma.user.findFirst({
      where: {
        email,
        password
      }
    })

    if(user) {
      delete user.password
      res.json(user)
    }
  }
}

