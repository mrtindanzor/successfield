import { NavLink, Link } from "react-router-dom";
import useAuth from './../../../Contexts/AuthenticationContext'
import { FileText, LogIn, UserCircle } from "lucide-react";

function NotLoggedIn(){
  return (
    <div className=" flex ml-auto ">
      <NavLink to='/users/students-area' className="after:!border-none flex gap-2 whitespace-nowrap items-center border-2 border-gray-400 px-3 py-2 sm:px-2 sm:py-2 md:px-5 md:py-2 rounded sm:border-none font-bold text-lg md:text-xl text-gray-950">
        <LogIn />
        Log in
      </NavLink>
      <Link to='/users/join' className="hidden sm:flex gap-2 whitespace-nowrap items-center text-lg sm:text-xl font-bold text-gray-950 px-4 py-2 rounded bg-green-500 [box-shadow:3px_3px_3px_3px_gray] hover:bg-white hover:translate-y-1 transition-transform duration-300 ease-linear">
        <FileText />
        Apply
      </Link>
    </div>
  )
}

function MyProfile(){

  return (
      <Link to='/dashboard/profile' className=" ml-auto py-2 px-4 bg-gray-800 h-[calc(100%-2px)] text-white hover:bg-gray-500 hover:text-white flex items-center gap-x-2 ">
        <UserCircle />
        Profile
      </Link>
  )
}

export default function AuthButtons(){
  const { isLoggedIn, initialFetch } = useAuth()

  return (
    <>
      
      { !initialFetch && isLoggedIn && <MyProfile /> }
      { !initialFetch && !isLoggedIn && <NotLoggedIn /> }
    </>
  )
}