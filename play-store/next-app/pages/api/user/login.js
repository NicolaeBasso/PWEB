import prisma from "../../../lib/prisma"

export default async function handle(req, res) {  
  const {email, password} = req.body

  if(req.method === 'POST') {
    const user = await prisma.user.findFirst({
      where: {
        email,
        password
      }
    })

    if(user) {
      delete user.password
      res.json(user)
    } else  
      res.status(404).send("User does not exist")
  }
}

