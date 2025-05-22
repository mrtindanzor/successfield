import { createContext, useContext,  useState, useEffect } from "react";

const ServerContext = createContext()

export function ServerProvider({ children }){
  const [ uri, setUri ] = useState(null)
  const location = window.location.href

  useEffect(() => {
    let isFound = false
    const parts = location.toLowerCase().split(':')
    parts && parts.map( part => {
      if(isFound) return
      if(part.includes('localhost')){
        setUri('http://localhost:8000/successfield/')
        isFound = true
      }
    } )
    if(!isFound) setUri('https://successfield.onrender.com/successfield/')
  }, [])

  if(!uri) return null

  return (
    <ServerContext.Provider value={ uri }>
      { children } 
    </ServerContext.Provider>
  )
}

export default function useServerUri(){
  return useContext(ServerContext)
}