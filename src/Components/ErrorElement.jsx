import { useRouteError, Link } from "react-router-dom";
import { capitalize } from "../core";


export default function ErrorElement(){
  const error = useRouteError()

  return(
    <div className="w-full max-w-[500px] grid gap-3 mx-auto relative top-20">
      <h2 className="text-2xl font-bold text-red-500"> Something went wrong </h2>
      <p className="text-xl"> { capitalize( error.message ) } </p>
      <Link to='/' className="w-fit py-1 px-3 rounded hover:bg-green-700 bg-green-500 text-white font-semibold"> Go to homepage </Link>
    </div>
  )
}