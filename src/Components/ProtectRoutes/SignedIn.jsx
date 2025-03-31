import { useNavigate } from "react-router-dom";
import useAuth from "../../Contexts/AuthenticationContext/AuthenticationContext";
import { useEffect } from "react";


export default function SignedIn({ children }){
  const navigate = useNavigate()
  const { isLoggedIn, initialFetch } = useAuth()

  useEffect(() => {
    if(!initialFetch) isLoggedIn ? navigate('/') : children
  }, [isLoggedIn, initialFetch])

  return(
    <>
      loading....
    </>
  )
}