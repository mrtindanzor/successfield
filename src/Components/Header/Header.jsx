import { useState } from 'react'
import AuthButtons from "./AuthButtons";
import LogoElement from "./Logo";
import Navbar, { MenuButton } from "../Navbar";

export default function Header(){
  const [ coursesActive, setCoursesActive ] = useState(false)
  const [ navbarActive, setNavbarActive ] = useState(false)

  return (
    <header className="sticky px-5 md:py-2 sm:px-8 md:px-10 bg-white z-9999 w-[100vw] gap-4 top-0 left-0 md:h-18 grid grid-cols-[auto_auto_1fr] lg:grid-cols-[auto_1fr_auto] justify-start items-start max-w-[1440px] mx-auto">
      <MenuButton { ...{ navbarActive, setNavbarActive } } />
      <LogoElement />
      <Navbar { ...{ coursesActive, setCoursesActive, navbarActive, setNavbarActive } } />
      <AuthButtons />
    </header>
  )
}