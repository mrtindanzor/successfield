import AuthButtons from "./Auth/AuthButtons";
import Logo from "./Logo/Logo";
import { DeskMenuButton, MenuButton } from "../Navbar/Navbar";

export default function Header(){

  return (
    <header className=" fixed px-1 bg-white z-9999 w-[100vw] gap-5 top-0 left-0 h-14 flex items-center border-b-1 border-b-gray-500 ">
      <MenuButton />
      <Logo />
      <DeskMenuButton />
      <AuthButtons />
    </header>
  )
}