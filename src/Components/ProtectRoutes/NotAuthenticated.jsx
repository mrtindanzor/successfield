import { useNavigate } from "react-router-dom";
import useAuth from "./../../Contexts/AuthenticationContext";
import { useEffect } from "react";
import { PendingLoading } from "../../Hooks/PendingLoader";


export function NotAuthenticated({ children }){
  const { isLoggedIn, initialFetch } = useAuth()
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!initialFetch && !isLoggedIn) navigate('/users/students-area', { replace: true })

  }, [isLoggedIn, initialFetch])

  if(!initialFetch && isLoggedIn){
    return <>{ children }</>
  }
  
  return <PendingLoading />
}