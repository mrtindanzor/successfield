import { useState } from 'react'
import styles from './ResetPassword.module.css'
import useAuth from '../../../../../Contexts/AuthenticationContext/AuthenticationContext'

export default function ResetPassword(){
  const { currentUser } = useAuth()
  const [ verificationCode, setVerficationCode ] = useState(0)
  const [ verified, setVerified ] = useState(false)
  const [ password, setPassword ] = useState('')


  return (
    <form className={ styles.passwordReset }>
      <label>
        <span> Email: </span>
        <input type="email" value={ currentUser.email } readOnly />
      </label>
      {   
        verificationCode < 1 && (
          <label className={ styles.verify }>
            <span> Verification Code </span>
            <input type="password" value={ verificationCode } onChange={ (e) => setVerficationCode(e.target.value) } /> 
            <span> Get code </span>
          </label>
        ) 
      }
      {
        verified && <>
                      <label>
                        <span> New password: </span>
                        <input type="password" value={ password } onChange={ (e) => setPassword(e.target.value) } />
                      </label>
                      <button> Apply changes </button>
                    </>
      }
    </form>
  )
}