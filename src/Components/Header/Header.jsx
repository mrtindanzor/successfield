import "./Header.module.css";
import AuthButtons from "./Auth/AuthButtons";
import Logo from "./Logo/Logo";

export default function Header(){

  return (
    <header>
      <Logo />
      <AuthButtons />
    </header>
  )
}