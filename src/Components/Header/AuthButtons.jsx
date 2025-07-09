import { NavLink, Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import { userSelector } from '../../Slices/userSlice'
import { FileText, LogIn, UserCircle } from "lucide-react";

function NotLoggedIn(){
  return (
    <div 
      className=" flex gap-1 w-fit z-3 justify-self-end">
      <NavLink 
        to='/users/students-area' 
        className="after:!border-none flex gap-2 whitespace-nowrap items-center border-2 px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-2 rounded hover:border-gray-300 md:bg-transparent border-gray-200 font-bold text-lg md:text-xl text-gray-950 bg-gray-100 hover:bg-gray-200">
        <LogIn />
        Log in
      </NavLink>
      <Link 
        to='/users/join' 
        className="hidden md:flex gap-2 whitespace-nowrap items-center text-lg sm:text-xl font-bold text-white px-6 py-2 rounded bg-green-600 border-2 hover:border-gray-300 hover:translate-y-1 transition-transform duration-300 ease-linear">
        <FileText />
        Apply
      </Link>
    </div>
  )
}

function MyProfile(){
  const { userPhoto } = useSelector( userSelector )

  return (
      <Link 
        to='/dashboard' 
        className="ml-auto">
        <img
          src={userPhoto}
          className="w-13 h-13 rounded-full p-0.5 border-gray-500 border-2"
        />
      </Link>
  )
}

export default function AuthButtons(){
  const { isLoggedIn, loading } = useSelector( userSelector )

  return (
    <>
      { !loading && isLoggedIn && <MyProfile /> }
      { !loading && !isLoggedIn && <NotLoggedIn /> }
    </>
  )
}