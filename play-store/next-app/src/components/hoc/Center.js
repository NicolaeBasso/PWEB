export const Center = (props) => {
  console.log(props);
  return (
    <div className="flex justify-center items-center h-screen text-center">
      {props.children}
    </div>)
}