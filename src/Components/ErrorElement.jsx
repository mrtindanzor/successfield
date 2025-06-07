import { useRouteError } from "react-router-dom";
import { capitalize } from "../core";
import LogoElement from "./Header/Logo";


export default function ErrorElement(){
  const error = useRouteError()

  return(
    <div
      className="grid grid-cols-[auto_1fr] gap-x-1 items-start w-fit mx-auto py-[10%]"
      >
      <LogoElement />
      <div className="grid gap-3">
        <h2 
          className="text-2xl font-bold text-red-500"
          > Something went wrong 
        </h2>
        <p
          className="text-xl"
          > { capitalize( error.message ) }
        </p>
        <button 
          className="w-fit py-2 px-5 text-lg capitalize rounded hover:bg-green-700 bg-green-500 text-white font-semibold cursor-pointer"
          onClick={ () => window.location.reload() }
          > refresh
        </button>
      </div>
    </div>
  )
}