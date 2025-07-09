import { useSelector } from "react-redux";
import { userSelector } from "../../Slices/userSlice";
import ListLink from "../../Components/Dashboard/ListLink";
import Dashboard_sub from "../../Components/Dashboard/DashboardTemplates/Dashboard_sub";
import { capitalize } from "../../core";
import { Loading as Loader} from "../../Components/Loader";
import { List } from "lucide-react";

export default function MyCourses({ children }) {
  const { courses, loading } = useSelector( userSelector )

  if(loading) return <Loader />
  
  return (
    <Dashboard_sub>
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
    </Dashboard_sub>
  )
}
