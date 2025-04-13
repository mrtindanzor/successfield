import Alerter from "../../Hooks/Alerter/Alerter";
import Header from "../Header/Header";
import Navbar, { MenuBtnsProvider } from "../Navbar/Navbar";
import StarterLoader from "../../Hooks/Loader/StarterLoader/StarterLoader";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

export default function LayoutOne(){

  return (
    <div className="bg-gray-100 text-lg text-gray-600 min-h-[100vh] ">
      <ScrollToTop />
      <Alerter />
      <StarterLoader />
      <MenuBtnsProvider>
        <Header />
        <Navbar />
      </MenuBtnsProvider>
      <Outlet />
    </div>
  )
}