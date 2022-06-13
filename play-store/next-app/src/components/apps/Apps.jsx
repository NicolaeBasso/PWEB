import styles from "./styles.module.scss"

export const Apps = (props) => {
  const apps = props?.apps

  if (!apps.length)
    return <>No apps</>

  return (
    <div className={styles.apps}>
      {apps.map((app) => {
        return (
          <div className={styles.app} id={app.id}>
            <h1>{app?.name}</h1>
            <h2 style={{ marginTop: "-10px" }}>Category: {app?.category}</h2>
            <h2 style={{ marginTop: "-10px" }}>Creator: {app?.creator}</h2>
            <h3>{app?.description}</h3>
            {app?.url && <a href={app?.url}><h4>Download</h4></a>}
          </div>)
      })}
    </div >)
}