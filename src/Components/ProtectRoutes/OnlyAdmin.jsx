import { useEffect } from "react";
import useAuth from "../../Contexts/AuthenticationContext/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import usePendingLoader from "../../Hooks/Loader/PendingLoader/PendingLoader";


export default function OnlyAdmin({ children }){
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const { setIsPendingLoader } = usePendingLoader()
  setIsPendingLoader(true)

  useEffect(() => {
    if(currentUser && !currentUser.admin) {
      
      navigate('/', { replace: true })
    }
  }, [currentUser])

  if(currentUser && currentUser.admin){
    setIsPendingLoader(false)

    return <> { children } </>
  }
  return <></>
}