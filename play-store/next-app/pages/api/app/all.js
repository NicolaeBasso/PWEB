import prisma from "../../../lib/prisma"
import { getToken } from "next-auth/jwt"

export default async function handle(req, res) {
  if (req.method === 'GET') {
    console.log("req url = ", req.url);
    const allApps = await prisma.app.findMany();

    console.log("apps = ", allApps);

    const token = await getToken({ req, encryption: true })
    console.log("TOKEN = ", token);

    const { role } = token;

    if (role !== 3)
      res.json(allApps)

    res.json(allApps.map((el) => { el.url = null; return el; }))
  }
}

