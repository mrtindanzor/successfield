import { createContext, useContext, useState } from 'react'

const PendingLoaderContext = createContext()

export function PendingLoaderProvider({ children }){
  const [ isPendingLoader, setIsPendingLoader ] = useState(false)

  return(
    <PendingLoaderContext.Provider value={ { setIsPendingLoader, isPendingLoader } }>
      { children }
    </PendingLoaderContext.Provider>
  )
}

export default function usePendingLoader(){ return useContext( PendingLoaderContext ) }
