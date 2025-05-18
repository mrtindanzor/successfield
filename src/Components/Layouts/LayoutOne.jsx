import Alerter from "../../Hooks/Alerter";
import Header from "../Header/Header";
import StarterLoader from "../../Hooks/StarterLoader";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import { PendingLoader } from './../../Contexts/PendingLoaderContext'
import UserInfo from '../Authentication/UserInfo'
import Certificate from '../Certificate'

export default function LayoutOne(){

  return (
    <div className="text-lg text-gray-600 min-h-[100vh] ">
      <Certificate { ...{ name: 'simon tindanzor', certificateCode: 'cnas', programme: 'programme', studentNumber: 'sfc-827193', dateCompleted: 'July 2024' } } />
      <ScrollToTop />
      <PendingLoader />
      <Alerter />
      <StarterLoader />
      <Header />
      <UserInfo />
      <Outlet />
    </div>
  )
}