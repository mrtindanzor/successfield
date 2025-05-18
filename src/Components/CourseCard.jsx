import { Link } from "react-router-dom";
import { capitalize, createAcronym } from "../core";

export default function CourseCard({ pic = '', title, overview, isCourse }){
  const courseLink = title.toLowerCase().trim().split(' ').join('_')
  const courseAcronym = createAcronym(title)
  const placeholder = pic ? <img src={ pic } alt={ courseAcronym } className=" " /> : <div className=" flex justify-center text-gray-800 w-full h-full flex-1 py-5 border-b-1 border-b-green-700 object-contain text-2xl texturina "> { courseAcronym } </div>

  return (
    <div className={`bg-green-500/50 rounded-md grid gap-y-5 pt-10 pb-20 px-5 [box-shadow:2px_2px_5px_gray] min-h-80 overflow-hidden ${ isCourse && 'w-80 mx-auto' }`} >
      { placeholder }
      <h3 className="text-2xl text-white [text-shadow:1px_1px_1px_black] font-bold capitalize"> { title } </h3>
      { overview && <Link to={ '/courses/' + courseLink } className="bg-white w-fit whitespace-nowrap h-fit py-2 px-5 mt-10 rounded-sm font-semibold text-xl hover:bg-transparent hover:border-1"> Start course </Link> }
    </div>
  )
}