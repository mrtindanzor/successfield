import { useState } from 'react'
import AuthButtons from "./Auth/AuthButtons";
import LogoElement from "./Logo/Logo";
import Navbar, { MenuButton } from "../Navbar";

export default function Header(){
  const [ coursesActive, setCoursesActive ] = useState(false)
  const [ navbarActive, setNavbarActive ] = useState(false)

  return (
    <header className="sticky px-5 py-5 md:py-2 sm:px-6 md:px-10 bg-white z-9999 w-[100vw] gap-2 top-0 left-0 md:h-18 flex items-center lg:max-w-[1440px] mx-auto">
      <MenuButton { ...{ navbarActive, setNavbarActive } } />
      <LogoElement />
      <Navbar { ...{ coursesActive, setCoursesActive, navbarActive, setNavbarActive } } />
      <AuthButtons />
    </header>
  )
}