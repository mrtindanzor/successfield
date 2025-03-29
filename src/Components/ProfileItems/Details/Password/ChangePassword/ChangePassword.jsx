import { useState } from 'react'
import styles from './ChangePassword.module.css'

export default function ChangePassword(){
  const [ oldPassword, setOldPassword ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ cpassword, setCpassword ] = useState('')


  return (
    <form className={ styles.passwordChange }>
      <label>
        <span> Old password: </span>
        <input type="password" value={ oldPassword } onChange={ (e) => setOldPassword(e.target.value) } />
      </label>
      <label>
        <span> New password: </span>
        <input type="password" value={ password } onChange={ (e) => setPassword(e.target.value) } />
      </label>
      <label>
        <span> Confirm new password </span>
        <input type="password" value={ cpassword } onChange={ (e) => setCpassword(e.target.value) } />
      </label>
      <button> Apply changes </button>
    </form>
  )
}