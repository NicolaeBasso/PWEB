import { useState, useEffect } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import styles from './styles.module.scss'

export const NavBar = () => {
  const { data: session } = useSession()

  const handleAuth = () => {
    console.log("SESSION = ", session)

    if (session)
      signOut()
    else
      signIn()
  }

  let role, name, image

  if (session?.user) {
    role = session.user.role
    name = session.user.name
    image = session.user.image
  }

  return (
    <div className={styles.navbar}>
      <Link href='/games' className={styles.navbar.logo}>
        <a>
          <button>Games</button>
        </a>
      </Link>
      <Link href='/apps'>
        <a style={{ marginRight: "100px" }}>
          <button>Apps</button>
        </a>
      </Link>
      <span>
        <img src={image} alt={name} />
      </span>
      <Link href='/'>
        <a>
          <button onClick={() => {
            handleAuth()
          }}>{session ? "Logout" : "Login"}</button>
        </a>
      </Link>
    </div >
  )
}