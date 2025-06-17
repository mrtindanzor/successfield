import { Link } from "react-router-dom";
import { capitalize, createAcronym } from "../core";

export default function CourseCard({ pic = '', title, overview, isCourse }){
  const courseLink = title.toLowerCase().trim().split(' ').join('_')
  const courseAcronym = createAcronym(title)

  return (
    <div className={`bg-white drop-shadow-xl rounded-md grid grid-rows-[auto_1fr_auto] gap-y-5 pt-5 pb-10 px-5 min-h-80 overflow-hidden ${ isCourse && 'w-80 mx-auto' }`} >
      { pic && <img src={ pic } alt={ courseAcronym } className=" " /> }
      { !pic && <div className="flex text-gray-900 w-full h-full flex-1 py-5 border-b-1 border-b-green-700 object-contain text-2xl caprasimo "> { courseAcronym } </div> }
      <h3 className="text-gray-700 capitalize tuffy"> { title } </h3>
      { overview && <Link to={ '/courses/' + courseLink } className="text-gray-800 border-2 w-fit whitespace-nowrap h-fit py-2 px-5 mt-5 rounded-sm font-semibold text-xl hover:bg-gray-600 hover:text-white tuffy"> Start course </Link> }
    </div>
  )
}