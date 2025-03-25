import { createContext, useContext } from "react";
import { getBaseUrl } from "../../core";


const ServerContext = createContext()

export function ServerProvider({ children }){
  const location = window.location.href
  const currentUri = getBaseUrl(location)
  console.log(currentUri)
  const serverUri = currentUri === 'http://localhost:5173' ? 'http://localhost:8000/' : 'https://successfield-server.onrender.com/'
  console.log(serverUri)

  return (
    <ServerContext.Provider value={ serverUri }>
      { children } 
    </ServerContext.Provider>
  )
}

export default function useServerUri(){
  return useContext(ServerContext)
}