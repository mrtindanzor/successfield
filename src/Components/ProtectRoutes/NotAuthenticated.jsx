import { Navigate } from 'react-router-dom'
import { useAuth } from './../../Hooks/useAuthentication/useAuthentication'

export default function NotAuthenticated({ children }){
  const { isLoggedIn, initialRefreshPending } = useAuth()

  return (
    <>
    { !initialRefreshPending && isLoggedIn ? children : <Navigate to='/users/login' /> }
    </>
  )
}