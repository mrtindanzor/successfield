import { NavLink, Link } from "react-router-dom";
import useAuth from './../../../Contexts/AuthenticationContext/AuthenticationContext'
import { LogIn, UserCircle, UserPlus } from "lucide-react";

function NotLoggedIn(){
  return (
    <div className=" flex border-1 border-black ml-auto ">
      <NavLink to='/users/students-area' className=" p-2 hover:bg-green-500 hover:text-white flex items-center gap-x-2 ">
        <LogIn />
        Log in
      </NavLink>
      <NavLink to='/users/join' className=" bg-black hidden md:flex text-white p-2 hover:bg-green-500 items-center gap-x-2">
        <UserPlus />
        Sign up
      </NavLink>
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