import { useSelector } from "react-redux";
import { userSelector } from "../../../Slices/userSlice";
import ListLink from "../../../Components/Dashboard/ListLink";
import { capitalize } from "../../../core";
import { Loading as Loader} from "../../../Components/Loader";
import { Outlet, useOutlet } from "react-router-dom";
import { useEffect } from "react";

export default function MyCertificates() {
  useEffect(() => {
    document.title = 'Successfield | My certificates'
  }, [])
  const hasChildren = useOutlet()
  const { certificates, loading } = useSelector( userSelector )

  if(loading) return <Loader />
  
  return (
    <div
      className={`${ hasChildren ? 'grid md:grid-cols-[auto_1fr]':'' }`}
    >
      <ul
        className={`${ hasChildren ? 'hidden md:block':'md:w-fit md:!max-w-80 ' } h-screen md:bg-gray-200`}
      >
        { certificates?.map( certificate => <ListLink
          key={certificate.programme}
          link={`/dashboard/my-certificates/${certificate._id}`}
          title={capitalize(certificate.programme)}
          classes="border-y-2 border-y-gray-100 md:max-w-80"
        >
          <div />
        </ListLink> ) }
      </ul>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
