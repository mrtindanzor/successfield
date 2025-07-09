import { useSelector } from "react-redux";
import { userSelector } from "../../Slices/userSlice";
import ListLink from "../../Components/Dashboard/ListLink";
import Dashboard_sub from "../../Components/Dashboard/DashboardTemplates/Dashboard_sub";
import { capitalize } from "../../core";
import { Loading as Loader} from "../../Components/Loader";

export default function MyCertificates({ children }) {
  const { certificates, loading } = useSelector( userSelector )

  if(loading) return <Loader />
  
  return (
    <Dashboard_sub>
      <div
        className={`${ children ? 'grid md:grid-cols-[auto_1fr]':'' }`}
      >
        <ul
          className={`${ children ? 'hidden md:block':'md:w-fit' } h-screen md:border-r-2 border-r-gray-600`}
        >
          { certificates?.map( certificate => <ListLink
            key={certificate.programme}
            link={`/dashboard/my-certificates/${certificate._id}`}
            title={capitalize(certificate.programme)}
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
