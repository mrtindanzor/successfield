import styles from './Login.module.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../Contexts/AuthenticationContext/AuthenticationContext'
import { useSetAlert } from '../../../Hooks/Alerter/Alerter'
import icons from '../../../Icons/icons'
import PendingLoader from '../../../Hooks/Loader/PendingLoader/PendingLoader'

const hideIcon = icons.eyeClose(styles.passwordIcon, 'Show')
const showIcon = icons.eyeOpen(styles.passwordIcon, 'Hide')


export default function Login(){
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ isPassVisible, setIsPassVisible ] = useState(false)
  const setMsg = useSetAlert()
  const navigate = useNavigate()
  
  const credentials =  { email, password }
  const { login } = useAuth()

    const emailLabel = <label>
                            <span>Email: </span>
                            <input type="email" onChange={ (e) => setEmail(e.target.value) } value={ email } />
                          </label>

    const passwordLabel = <label>
                            <span>Password: </span>
                            <input type={ isPassVisible ? 'text' : 'password' } onChange={ (e) => setPassword(e.target.value) } value={ password } />
                            <span className={styles.passwordIconBtn} onClick={ () => toggleIconVisibility('password') }> { !isPassVisible ? hideIcon : showIcon } </span>
                          </label>

const handler = login

function toggleIconVisibility(object){
  if(object === 'password'){
      setIsPassVisible(v => !v)
    }
}

async function handleFormSubmission(e){
  e.preventDefault()

  try{
    const res = await handler(credentials, navigate)
    if(res && res.msg) setMsg(res.msg)
    } catch(err){
      setMsg(err.message)
    }
  }

  return (
    <>
      <form onSubmit={ (e) => handleFormSubmission(e) } className={ styles.authForm }>
        <h3> Sign in </h3>
        { emailLabel }
        { passwordLabel }
        <button className={ styles.button }> Log in </button>
      </form>
    </>
  )
}