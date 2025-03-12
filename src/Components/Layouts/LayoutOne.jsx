import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function LayoutOne(){

  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
    </>
  )
}