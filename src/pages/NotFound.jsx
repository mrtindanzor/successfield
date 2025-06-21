import { Link } from "react-router-dom";

export default function NotFound(){

  return (
    <div className=" grid gap-x-5 gap-y-2 w-[95%] grid-cols-[auto_1fr] absolute left-1/2 -translate-1/2 top-1/2 max-w-[500px] mx-auto justify-center items-center">
      <h2 className=" tuffy-bold text-6xl text-red-500 row-span-2 items-center justify-center border-r-3 w-fit border-r-gray-500 px-3 min-h-full flex"> 404 </h2>
      <p>
        <span
          className="text-4xl block text-amber-500 pb-3 tuffy-bold">Ooops</span>
        The page or resource you are looking for has either been moved or does not exist.
      </p>
      <Link to='/' className="col-start-2 text-green-500 hover:text-green-700 transition duration-150 ease-out w-fit " > Back to homepage </Link>
    </div>
  )
}