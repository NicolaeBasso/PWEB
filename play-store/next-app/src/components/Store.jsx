import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { NavBar } from "./NavBar"

export const Store = () => {
  const { data: session } = useSession()

  let name, email, role, image;

  if (session?.user) {
    role = session.user?.role
    name = session.user?.name
    email = session.user?.email
    image = session.user?.image
  }

  return (
    <>
      <NavBar user={session?.user} />
    </>
  )
}