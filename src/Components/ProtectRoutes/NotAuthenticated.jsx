import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from 'react-redux'
import { userSelector } from '../../Slices/userSlice'
import { Loading } from '../../Components/Loader'


export function NotAuthenticated({ children }){
  const { isLoggedIn, loading } = useSelector( userSelector )
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!loading && !isLoggedIn) navigate('/users/students-area', { replace: true })

  }, [isLoggedIn, loading])

  if(!loading && isLoggedIn) return children
  
  return <Loading />
}