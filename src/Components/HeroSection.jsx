import { Link } from "react-router-dom";
import image from './../assets/images/hero.jpg'

const Content = {
  title: 'Excel with Successfield!',
  description: 'Get the expertise you need with our Executive Certificates and Doctorates. Enroll now and stay ahead!',
  action: 'Browse Courses'
}

export default function HeroSection(){
  
  return (
    <div className="grid  px-5 sm:px-10 py-10 pt-20 sm:pt-30 md:pt-20 gap-5 relative lg:max-w-[1440px] mx-auto">
      <h2 className="font-extrabold text-5xl flex flex-wrap text-black w-[min-content]"> { Content.title } </h2>
      <p className="sm:[text-shadow:1px_1px_1px_black] text-xl text-gray-700 sm:text-2xl max-w-[600px] sm:text-white sm:bg-gray-700/40 sm:px-3 sm:py-5 rounded"> { Content.description } </p>
      <img src={ image } alt="graduation" className="z-[-1] sm:absolute sm:right-0 bottom-15 sm:translate-x-[30%] lg:translate-x-0" />
      <Link to='courses' className="relative top-[-2.5rem] border-2 border-green-500 bg-green-500 drop-shadow-md drop-shadow-gray-700 hover:translate-y-1 transition-transform duration-300 ease-linear text-black w-fit px-5 py-3 rounded-sm font-semibold text-xl sm:text-2xl sm:mt-10"> { Content.action } </Link>
    </div>
  )
}