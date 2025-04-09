import usePendingLoader from '../../../Contexts/PendingLoader/PendingLoaderContext'
import styles from './PendingLoader.module.css'

function Loader(){

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
                isPendingLoader && <Loader />
            }
            
        </>
    )
}
