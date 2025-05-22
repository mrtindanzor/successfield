import { useRouteError } from "react-router-dom";
import { capitalize } from "../core";
import LogoElement from "./Header/Logo";


export default function ErrorElement(){
  const error = useRouteError()

  return(
    <div
      className="grid grid-cols-[auto_1fr] gap-x-1 items-start w-fit relative top-20 left-[50%] sm:gap-x-5 sm:left-[20%] translate-x-[-50%] px-5"
      >
      <LogoElement />
      <div className="w-full max-w-[500px] grid gap-3">
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