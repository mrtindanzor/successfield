import { createContext, useContext, useState } from 'react'
import { PendingLoading } from './../../Hooks/Loader/PendingLoader/PendingLoader'

const PendingLoaderContext = createContext()

export function PendingLoaderProvider({ children }) {
  const [ isPendingLoading, setIsPendingLoading ] = useState(false)

  return (
    <PendingLoaderContext.Provider value={ { isPendingLoading, setIsPendingLoading } }>
      { children }
    </PendingLoaderContext.Provider>
  )
}

export function PendingLoader(){
  const { isPendingLoading } = usePendingLoader()

  if(!isPendingLoading) return null

  return <PendingLoading />
}

export default function usePendingLoader(){ return useContext(PendingLoaderContext) }