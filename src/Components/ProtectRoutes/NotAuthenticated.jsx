import { useNavigate } from "react-router-dom";
import useAuth from "./../../Contexts/AuthenticationContext/AuthenticationContext";
import { useEffect } from "react";
import usePendingLoader from "../../Contexts/PendingLoader/PendingLoaderContext";


export function NotAuthenticated({ children }){
  const { isLoggedIn, initialFetch } = useAuth()
  const { setIsPendingLoader } = usePendingLoader()
  setIsPendingLoader(true)
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!initialFetch && !isLoggedIn) navigate('/users/students-area', { replace: true })

  }, [isLoggedIn, initialFetch])

  if(!initialFetch && isLoggedIn){
    setIsPendingLoader(false)
    return <>{ children }</>
  }
  
  return <></>
}