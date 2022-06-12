import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { Store } from '../src/components/Store'
import { Login } from "../src/components/LoginButton";

export default function LoginPage() {
  const { data: session } = useSession()

  useEffect(() => {
    console.log(session)
  }, [session])

  console.log({ session })

  return (
    <div className={styles.container}>
      <Head>
        <title>Play Store</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Login />

      {session && (
        <>
          <h4>You are logged as: {session.user.name}</h4>
          <div className={styles.boxCenter}>
            <h4>Email: {session.user.email}</h4>
            <br />
            {session.user.image && (
              <span>
                <img src={session.user.image} alt={session.user.name} />
              </span>
            )}
          </div>
        </>
      )}
    </div>
  )
}
