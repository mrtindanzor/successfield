import useAuth from '../../../../Contexts/AuthenticationContext/AuthenticationContext'
import styles from './PhoneNumber.module.css'

export default function PhoneNumber(){
  const { currentUser } = useAuth()

  return (
    <form className={ styles.form }>
      <input type="tel" className={ styles.PhoneNumberBox } value={ currentUser.phone } />
      <button className={ styles.submitButton }> Change phone number </button>
    </form>
  )
}