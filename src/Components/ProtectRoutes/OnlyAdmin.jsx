import { useEffect } from "react";
import useAuth from "../../Contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { PendingLoading } from "../../Hooks/PendingLoader";


export default function OnlyAdmin({ children }){
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(currentUser && !currentUser.admin) {
      
      navigate('/', { replace: true })
    }
  }, [currentUser])

  if(currentUser && currentUser.admin){

    return <> { children } </>
  }
  return <PendingLoading />
}