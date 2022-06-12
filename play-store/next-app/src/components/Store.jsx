import { useSession } from "next-auth/react"
import { useEffect } from "react"

export const Store = () => {
  const { data: session } = useSession()
  console.log("session in Store = ", session);
  const { name, email, role } = session.user;

  return (
    <>
      <h1 className="flex justify-center items-center h-screen text-center">Play Store</h1>
      <h2>Role = {role}</h2>
    </>
  )
}