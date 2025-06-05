import Logo from "../../Logo/Logo";
import { Link } from "react-router-dom";

export default function LogoElement(){
  return (
    <Link to='/' className=" p-2 flex items-center h-15 gap-x-2 translate-x-[-1rem]">
      <Logo {...{ classname: 'w-15', title: 'SuccessField College' }}  />
    </Link>
  )
}