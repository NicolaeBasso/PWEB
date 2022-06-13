import { API_URL } from "../src/constants/index"
import { NavBar } from "../src/components/NavBar"
import { Apps } from "../src/components/apps/Apps"

function AppsPage({ data }) {
  console.log("data = ", data);

  return (
    <div>
      <NavBar />
      <Apps apps={data} />
    </div>)
}

export default AppsPage;

export const getServerSideProps = async (context) => {
  const res = await fetch(`${API_URL}/app/all`, {
    method: 'GET',
    credentials: "include",
    headers: {
      'Access-Control-Allow-Credentials': true,
      Cookie: context.req.headers.cookie
    }
  });
  const data = await res.json()

  return {
    props: { data }
  }
}