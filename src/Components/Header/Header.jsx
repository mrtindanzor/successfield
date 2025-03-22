import styles from "./Header.module.css";
import AuthButtons from "./Auth/AuthButtons";
import Logo from "./Logo/Logo";
import { DeskMenuButton, MenuButton } from "../Navbar/Navbar";

export default function Header(){

  return (
    <header className={ styles.header }>
      <MenuButton />
      <Logo />
      <DeskMenuButton />
      <AuthButtons />
    </header>
  )
}