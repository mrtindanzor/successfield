import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import StarterLoader from '../../Hooks/Loader/StarterLoader/StarterLoader'
import { Outlet } from "react-router-dom";

export default function LayoutOne(){

  return (
    <>
      <StarterLoader />
      <Header />
      <Navbar />
      <Outlet />
    </>
  )
}