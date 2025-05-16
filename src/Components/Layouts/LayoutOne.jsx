import Alerter from "../../Hooks/Alerter";
import Header from "../Header/Header";
import Navbar from "../Navbar";
import StarterLoader from "../../Hooks/StarterLoader";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import { PendingLoader } from './../../Contexts/PendingLoaderContext'
import UserInfo from '../Authentication/UserInfo'

export default function LayoutOne(){

  return (
    <div className="bg-gray-100 text-lg text-gray-600 min-h-[100vh] ">
      <ScrollToTop />
      <PendingLoader />
      <Alerter />
      <StarterLoader />
      <Header />
      <Navbar />
      <UserInfo />
      <Outlet />
    </div>
  )
}