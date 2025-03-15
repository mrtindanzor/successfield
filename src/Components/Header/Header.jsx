import "./Header.module.css";
import AuthButtons from "./Auth/AuthButtons";
import Logo from "./Logo/Logo";
import useAuthentication from "../../Hooks/useAuthentication/useAuthentication";
import { DeskMenuButton, MenuButton } from "../Navbar/Navbar";

export default function Header(){

  return (
    <header>
      <MenuButton />
      <Logo />
      <DeskMenuButton />
      <AuthButtons />
    </header>
  )
}