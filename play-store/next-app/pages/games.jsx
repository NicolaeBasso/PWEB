import { API_URL } from "../src/constants/index"
import { NavBar } from "../src/components/NavBar"
import { Games } from "../src/components/games/Games"

function GamesPage({ data }) {
  console.log("data = ", data);

  return (
    <div>
      <NavBar />
      <Games games={data} />
    </div>)
}

export default GamesPage;

export const getServerSideProps = async (context) => {
  const res = await fetch(`${API_URL}/game/all`, {
    method: 'GET',
    credentials: "include",
    headers: {
      'Access-Control-Allow-Credentials': true,
      Cookie: context.req.headers.cookie
    }
  });
  const data = await res.json()

  return {
    props: { data },
  }
}