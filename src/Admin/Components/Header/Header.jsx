import styles from './Header.module.css'
import { capitalize } from './../../../core'
import useAuth from './../../../Contexts/AuthenticationContext/AuthenticationContext'

export default function Header(){
  const { userFullName } = useAuth()


  return (
    <div className={ styles.header }>
      Admin: { userFullName }
    </div>
  )
}