import AuthButtons from "./Auth/AuthButtons";
import LogoElement from "./Logo/Logo";
import { DeskMenuButton, MenuButton } from "../Navbar";

export default function Header(){

  return (
    <header className=" sticky px-1 bg-white z-9999 w-[100vw] gap-2 top-0 left-0 h-14 flex items-center border-b-1 border-b-gray-500 ">
      <MenuButton />
      <LogoElement />
      <DeskMenuButton />
      <AuthButtons />
    </header>
  )
}