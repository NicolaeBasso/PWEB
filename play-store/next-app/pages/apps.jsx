import { API_URL } from "../src/constants/index";

function Apps({ data }) {
  console.log("data = ", data);
}

export default Apps;

export const getServerSideProps = async (context) => {
  // Fetch data from external API
  const res = await fetch(`${API_URL}/app/all`, {
    method: 'GET',
    credentials: "include",
    headers: {
      'Access-Control-Allow-Credentials': true,
      Cookie: context.req.headers.cookie
    }
  });
  const data = await res.json()

  console.log("Data in Apps server side props = ", data);

  return {
    props: { data }, // will be passed to the page component as props
  }
}