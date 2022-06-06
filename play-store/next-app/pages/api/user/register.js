import prisma from "../../../lib/prisma"

export default async function handle(req, res) {  
  const {email, password} = req.body

  if(req.method === 'POST') {
    const user = await prisma.user.findFirst({
      where: {
        email,
      }
    })

    if(!user) {
      prisma.user.create({
        email,
        password
      })

      res.status(201).json("Created")
    } else  
      res.status(400).send("Email already taken")
  }
}

