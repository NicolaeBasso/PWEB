import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Store } from '../src/components/Store'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Play Store</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Store />

    </div>
  )
}