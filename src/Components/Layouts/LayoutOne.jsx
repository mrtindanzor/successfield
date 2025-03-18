import Alerter from "../../Hooks/Alerter/Alerter";
import Header from "../Header/Header";
import Navbar, { MenuBtnsProvider } from "../Navbar/Navbar";
import StarterLoader from "../../Hooks/Loader/StarterLoader/StarterLoader";
import { Outlet } from "react-router-dom";

export default function LayoutOne(){

  return (
    <>
      <Alerter />
      <StarterLoader />
      <MenuBtnsProvider>
        <Header />
        <Navbar />
      </MenuBtnsProvider>
      <Outlet />
    </>
  )
}