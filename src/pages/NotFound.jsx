import { Link } from "react-router-dom";

export default function NotFound(){

  return (
    <div className=" grid gap-5 w-[95%] max-w-[500px] mx-auto relative top-20 text-center">
      <h2 className=" texturina text-6xl text-red-500 "> 404 </h2>
      <p>
        The page or resource you are looking for has either been moved or does not exist.
      </p>
      <Link to='/' className=" py-2 px-3 rounded bg-green-200 hover:bg-green-500 hover:text-white transition duration-150 ease-out w-fit justify-self-center  " > Back to homepage </Link>
    </div>
  )
}