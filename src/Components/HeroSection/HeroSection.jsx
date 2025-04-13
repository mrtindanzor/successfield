import background from "./../../assets/images/hero.webp";
import { Link } from "react-router-dom";

const Content = {
  title: 'Excel with Successfield!',
  description: 'Get the expertise you need with our Executive Certificates and Doctorates. Enroll now and stay ahead!',
  action: 'Browse Courses'
}

export default function HeroSection(){
  
  return (
    <div className=" relative h-[calc(100vh-100px)] w-[100vw] z-0 flex gap-3 flex-col *:not-last:w-[fit-content] *:not-last:ml-3 *:not-last:mt-3">
      <h2 className="font-bold text-4xl text-green-600 text-shadow-gray-800"> { Content.title } </h2>
      <p className="bg-white/80 p-4 font-semibold"> { Content.description } </p>
      <Link to='courses' className=" bg-green-400 hover:bg-green-600 py-2 px-3 rounded text-white "> { Content.action } </Link>
      <img src={ background } className=" absolute top-0 left-0 w-full h-full z-[-1] object-cover " />
    </div>
  )
}