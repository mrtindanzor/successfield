import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ListLink({ children, title, link, classes }){

  return (
    <li
      className=" not-last:border-b-2 border-b-gray-200"
    >
      <Link
        to={ link }
        className={`${ classes } grid grid-cols-[auto_1fr_auto] items-center border-y-2 border-transparent hover:border-gray-600 gap-2 !first-letter:uppercase w-full px-3 py-2 hover:bg-gray-300`}
      >
        { children }
        { title }
        <ChevronRight />
      </Link>
    </li>
  )
}