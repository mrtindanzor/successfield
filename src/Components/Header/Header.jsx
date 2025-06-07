import { useState } from 'react'
import AuthButtons from "./AuthButtons";
import LogoElement from "./Logo";
import Navbar, { MenuButton } from "../Navbar";
import { Link } from 'react-router-dom';

export default function Header(){
  const [ coursesActive, setCoursesActive ] = useState(false)
  const [ navbarActive, setNavbarActive ] = useState(false)

  return (
    <header className="sticky px-5 sm:px-8 md:px-10 md:py-2 bg-white z-2 w-[100vw] gap-x-2 top-0 left-0 md:h-22 grid grid-cols-[auto_1fr_auto_auto] md:grid-cols-[1fr_auto_auto] md:grid-rows-[auto_1fr] justify-start items-center md:items-start">
      <MenuButton { ...{ navbarActive, setNavbarActive } } />
      <LogoElement />
      <Link
        to="/find-professional"
        className='block  px-3 rounded font-bold border-2 text-black border-gray-200 hover:border-gray-400 py-2 w-fit h-fit bg-gray-100 hover:bg-gray-300'
      > Find a professional </Link>
      <AuthButtons />
      <Navbar { ...{ coursesActive, setCoursesActive, navbarActive, setNavbarActive } } />
    </header>
  )
}