import "./Header.module.css";
import AuthButtons, { MyProfile } from "./Auth/AuthButtons";
import Logo from "./Logo/Logo";
import useAuthentication from "../../Hooks/useAuthentication";
import { DeskMenuButton, MenuButton } from "../Navbar/Navbar";

export default function Header(){
  const { isLoggedIn } = useAuthentication()

  return (
    <header>
      <MenuButton />
      <Logo />
      <DeskMenuButton />
      {
        isLoggedIn ? <MyProfile /> : <AuthButtons />
      }
    </header>
  )
}