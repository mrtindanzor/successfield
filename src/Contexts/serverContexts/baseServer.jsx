import { createContext, useContext } from "react";


const ServerContext = createContext()

export function ServerProvider({ children }){
  const serverUri = 'http://localhost:8000/'

  return (
    <ServerContext.Provider value={ serverUri }>
      { children } 
    </ServerContext.Provider>
  )
}

export default function useServerUri(){
  return useContext(ServerContext)
}