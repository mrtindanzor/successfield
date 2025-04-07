import styles from './PendingLoader.module.css'

export default function PendingLoader(){

    return (
        <div className={ styles.loader }>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}