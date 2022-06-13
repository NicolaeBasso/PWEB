import { useSession, signIn, signOut } from "next-auth/react"

export const Login = () => {
  signIn();

  return (
    <>Login</>
  )
}