import Alerter from "../../Hooks/Alerter/Alerter";
import Header from "../Header/Header";
import Navbar, { MenuBtnsProvider } from "../Navbar/Navbar";
import StarterLoader from "../../Hooks/Loader/StarterLoader/StarterLoader";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

export default function LayoutOne(){

  return (
    <>
      <ScrollToTop />
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