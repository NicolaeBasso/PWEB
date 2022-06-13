import styles from "./styles.module.scss"

export const Games = (props) => {
  const games = props?.games

  if (!games.length)
    return <>No Games</>

  return (
    <div className={styles.games}>
      {games.map((game) => {
        return (
          <div className={styles.game} id={game.id}>
            <h1>{game?.name}</h1>
            <h2 style={{ marginTop: "-10px" }}>Genre: {game?.genre}</h2>
            <h2 style={{ marginTop: "-10px" }}>Creator: {game?.creator}</h2>
            <h3>{game?.description}</h3>
            {game?.url && <a href={game?.url}><h4>Download</h4></a>}
          </div>)
      })}
    </div >)
}