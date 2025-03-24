import { createContext, useContext } from "react";


const ServerContext = createContext()

export function ServerProvider({ children }){
  const serverUri = 'https://successfield-server.onrender.com/'

  return (
    <ServerContext.Provider value={ serverUri }>
      { children } 
    </ServerContext.Provider>
  )
}

export default function useServerUri(){
  return useContext(ServerContext)
}