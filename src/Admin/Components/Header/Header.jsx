import styles from './Header.module.css'
import { capitalize } from './../../../core'

export default function Header(){
  const currentUser = {
    firstname: 'simon',
    middlename: 'mba',
    surname: 'tindanzor',
    admin: true
  }

  const adminName = capitalize(currentUser.firstname + (currentUser.middlename && ' ' + currentUser.middlename ) + ' ' + currentUser.surname)


  return (
    <div className={ styles.header }>
      Admin: { adminName }
    </div>
  )
}