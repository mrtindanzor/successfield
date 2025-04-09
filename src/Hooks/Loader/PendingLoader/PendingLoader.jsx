import usePendingLoader from '../../../Contexts/PendingLoader/PendingLoaderContext'
import styles from './PendingLoader.module.css'

export function PendingLoading(){

    return (
        <div className={ styles.loader }>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default function PendingLoader(){
    const { isPendingLoader } = usePendingLoader()
    return (
        <>
            {
                isPendingLoader && <PendingLoading />
            }
            
        </>
    )
}
