import icons from "../../../Icons/icons";
import { Link } from "react-router-dom";

const appLogo = icons.logo(" w-12 h-12 text-green-600 ", 'Successfield College')
export default function Logo(){
  return (
    <Link to='/' className=" p-2 flex items-center gap-x-2 ">
      { appLogo }
      <h2 className=" text-black hover:text-green-900 text-2xl hover:underline hidden md:block "> Successfield College </h2>
    </Link>
  )
}