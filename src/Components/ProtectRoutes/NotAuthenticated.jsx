import { useNavigate } from "react-router-dom";
import useAuth from "./../../Contexts/AuthenticationContext/AuthenticationContext";
import { useEffect } from "react";


export function NotAuthenticated({ children }){
  const { isLoggedIn, initialFetch } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(!initialFetch && !isLoggedIn) navigate('/users/students-area', { replace: true })

  }, [isLoggedIn, initialFetch])

  if(!initialFetch && isLoggedIn) return <>{ children }</>
  
  return(
    <>
      loading...
    </>
  )
}