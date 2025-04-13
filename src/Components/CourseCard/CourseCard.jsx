import { Link } from "react-router-dom";
import { capitalize, createAcronym } from "../../core";

export default function CourseCard({ pic = '', title, overview }){
  const courseLink = title.toLowerCase().trim().split(' ').join('-')
  const courseAcronym = createAcronym(title)
  const placeholder = pic ? <img src={ pic } alt={ courseAcronym } className=" " /> : <div className=" flex place-items-center justify-center bg-green-200 text-green-900 w-full h-full flex-1 border-b-1 border-b-green-700 object-contain text-2xl texturina "> { courseAcronym } </div>

  return (
    <div className=" bg-white border-1 border-gray-900 rounded-lg flex flex-col h-90 w-80 mx-auto shadow-gray-900 overflow-hidden " >
      { placeholder }
      <span className=" p-3 text-xl text-grey-900 "> { capitalize( title ) } </span>
      { overview && <Link to={ '/courses/' + courseLink } className=" p-3 m-3 w-fit rounded-md text-green-400 hover:text-gray-900 hover:bg-green-400 transition ease-in border-1 border-green-400 "> Start course </Link> }
    </div>
  )
}