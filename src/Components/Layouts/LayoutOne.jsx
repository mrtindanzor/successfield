import Alerter from "../../Hooks/Alerter/Alerter";
import Header from "../Header/Header";
import Navbar, { MenuBtnsProvider } from "../Navbar/Navbar";
import StarterLoader from "../../Hooks/Loader/StarterLoader/StarterLoader";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import PendingLoader from "../../Hooks/Loader/PendingLoader/PendingLoader";

export default function LayoutOne(){

  return (
    <>
      <ScrollToTop />
      <Alerter />
      <PendingLoader />
      <StarterLoader />
      <MenuBtnsProvider>
        <Header />
        <Navbar />
      </MenuBtnsProvider>
      <Outlet />
    </>
  )
}