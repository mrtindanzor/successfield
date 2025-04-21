import Logo from "../../../Logo/Logo";
import { Link } from "react-router-dom";
const logoClasses = 'w-14 h-14'

export default function LogoElement(){
  return (
    <Link to='/' className=" p-2 flex items-center gap-x-2 ">
      <Logo {...{ classname: logoClasses, title: 'SuccessField College' }}  />
      <h2 className=" text-black hover:text-green-900 text-2xl hover:underline hidden md:block "> Successfield College </h2>
    </Link>
  )
}