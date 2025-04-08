import { createContext, useContext, useState } from 'react'
import styles from './PendingLoader.module.css'

const PendingLoaderContext = createContext()

export function PendingLoaderProvider({ children }){
    const [ isPendingLoader, setIsPendingLoader ] = useState(false)

    return(
        <PendingLoaderContext.Provider value={ { setIsPendingLoader, isPendingLoader } }>
            { children }
        </PendingLoaderContext.Provider>
    )
}

export function PendingLoader(){
    const { isPendingLoader } = usePendingLoader()
    return (
        <>
            {
                isPendingLoader && (<div className={ styles.loader }>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>)
            }
            
        </>
    )
}

export default function usePendingLoader(){ return useContext( PendingLoaderContext ) }
