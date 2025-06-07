import Logo from "../../Logo/Logo";
import { Link } from "react-router-dom";

export default function LogoElement(){
  return (
    <Link to='/' className=" flex items-center h-15 md:h-10 gap-x-2">
      <Logo {...{ classname: 'w-15', title: 'SuccessField College' }}  />
      <span
        className="text-2xl hidden lg:block font-bold italic text-green-700"
      > SuccessField College </span>
    </Link>
  )
}