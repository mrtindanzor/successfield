import useAuth from '../../../../Contexts/AuthenticationContext/AuthenticationContext'
import styles from './Email.module.css'

export default function Email(){
  const { currentUser } = useAuth()

  return (
    <form className={ styles.form }>
      <input type="email" className={ styles.emailbox } value={ currentUser.email } />
      <button className={ styles.submitButton }> Change email </button>
    </form>
  )
}