import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { userSelector } from '../../Slices/userSlice'
import { Loading } from '../Loader'


export default function SignedIn({ children }){
  const navigate = useNavigate()
  const { isLoggedIn, loading } = useSelector( userSelector )

  useEffect(() => {
    if(!loading && isLoggedIn)  navigate('/', { replace: true })
  }, [isLoggedIn, loading])

  if(!loading && !isLoggedIn) return children

  return(
    <Loading />
  )
}