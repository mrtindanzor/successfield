import Logo from "../../Logo/Logo";
import { Link } from "react-router-dom";

export default function LogoElement(){
  return (
    <Link to='/' className=" flex items-center h-15 md:h-10 gap-x-2 tuffy-bold">
      <Logo {...{ classname: 'w-15', title: 'SuccessField College' }}  />
    </Link>
  )
}