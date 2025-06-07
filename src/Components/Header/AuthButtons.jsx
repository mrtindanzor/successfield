import { NavLink, Link } from "react-router-dom";
import useAuth from './../../Contexts/AuthenticationContext'
import { FileText, LogIn, UserCircle } from "lucide-react";

function NotLoggedIn(){
  return (
    <div className=" flex gap-1 w-fit z-3 justify-self-end">
      <NavLink to='/users/students-area' className="after:!border-none flex gap-2 whitespace-nowrap items-center border-2 px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-2 rounded hover:border-gray-300 md:bg-transparent border-gray-200 font-bold text-lg md:text-xl text-gray-950 bg-gray-100 hover:bg-gray-200">
        <LogIn />
        Log in
      </NavLink>
      <Link to='/users/join' className="hidden md:flex gap-2 whitespace-nowrap items-center text-lg sm:text-xl font-bold text-white px-4 py-2 rounded bg-green-400 border-2 hover:border-gray-300 hover:translate-y-1 transition-transform duration-300 ease-linear">
        <FileText />
        Apply
      </Link>
    </div>
  )
}

function MyProfile(){

  return (
      <Link to='/dashboard/profile' className=" ml-auto py-2 px-4 bg-white border-2 h-[calc(100%-2px)] text-gray-950 rounded hover:bg-gray-950 hover:text-white flex items-center gap-x-2 ">
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