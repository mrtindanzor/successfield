import { useSelector } from "react-redux";
import { userSelector } from "../../../Slices/userSlice";
import ListLink from "../../../Components/Dashboard/ListLink";
import { capitalize } from "../../../core";
import { Loading as Loader} from "../../../Components/Loader";

export default function MyCourses({ children }) {
  const { courses, loading } = useSelector( userSelector )

  if(loading) return <Loader />
  
  return (
    <div
      className={`${ children ? 'grid w-full':'' }`}
    >
      <ul
        className={`${ children ? 'hidden md:block':'' } h-screen w-full`}
      >
        { courses?.map( course => <ListLink
          key={course}
          link={`/courses/${ course.trim().toLowerCase().replaceAll(' ', '_') }`}
          title={capitalize(course)}
        >
          <div />
        </ListLink> ) }
      </ul>
      <div>
        { children }
      </div>
    </div>
  )
}
