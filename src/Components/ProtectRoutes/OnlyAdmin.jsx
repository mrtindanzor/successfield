import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { userSelector } from '../../Slices/userSlice'
import { Loading } from '../../Components/Loader'


export default function OnlyAdmin({ children }){
  const { user } = useSelector( userSelector )
  const navigate = useNavigate()

  useEffect(() => {
    if(user && !user.admin) {
      
      navigate('/', { replace: true })
    }
  }, [user])

  if(user && user.admin){

    return <> { children } </>
  }
  return <PendingLoading />
}