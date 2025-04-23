import { useNavigate } from "react-router-dom";
import useAuth from "../../Contexts/AuthenticationContext";
import { useEffect } from "react";
import { PendingLoading } from './../../Hooks/PendingLoader';


export default function SignedIn({ children }){
  const navigate = useNavigate()
  const { isLoggedIn, initialFetch } = useAuth()

  useEffect(() => {
    if(!initialFetch && isLoggedIn)  navigate('/', { replace: true })
  }, [isLoggedIn, initialFetch])

  if(!initialFetch && !isLoggedIn) return <> { children } </>

  return(
    <PendingLoading />
  )
}