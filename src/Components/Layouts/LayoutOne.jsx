import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import UserInfo from '../Authentication/UserInfo'

export default function LayoutOne(){

  return (
    <div className="text-lg text-gray-600 min-h-[100vh] tuffy">
      <ScrollToTop />
      <Header />
      <UserInfo />
      <Outlet />
    </div>
  )
}