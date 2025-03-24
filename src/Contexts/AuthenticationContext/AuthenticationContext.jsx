import { createContext, useContext } from "react"
import useAuthentication from "../../Hooks/useAuthentication/useAuthentication"

const AuthContext = createContext()

export function AuthenticationProvider({ children }){
  const auth = useAuthentication()
  
  return (
    <AuthContext.Provider value={ auth }>
      { children }
    </AuthContext.Provider>
  )
}

export default function useAuth(){
  return useContext(AuthContext)
}