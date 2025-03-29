import { createContext, useContext } from "react";
import { getBaseUrl } from "../../core";


const ServerContext = createContext()

export function ServerProvider({ children }){
  const location = window.location.href
  const currentUri = getBaseUrl(location)
  const serverUri = currentUri === 'http://localhost:5173' ? 'http://localhost:8000/successfield/' : 'https://successfield-server.onrender.com/successfield/' + 'successfield/'
  return (
    <ServerContext.Provider value={ serverUri }>
      { children } 
    </ServerContext.Provider>
  )
}

export default function useServerUri(){
  return useContext(ServerContext)
}