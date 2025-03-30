import icons from "./../../Icons/icons";
import styles from "./Authentication.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetAlert } from "../../Hooks/Alerter/Alerter";
import useAuth from './../../Contexts/AuthenticationContext/AuthenticationContext'

const hideIcon = icons.eyeClose(styles.passwordIcon, 'Show')
const showIcon = icons.eyeOpen(styles.passwordIcon, 'Hide')


export default function Authentication({ page }){
  const [ firstname, setFirstname ] = useState('')
  const [ middlename, setMiddlename ] = useState('')
  const [ surname, setSurname ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ contact, setContact ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ cpassword, setCpassword ] = useState('')
  const [ isPassVisible, setIsPassVisible ] = useState(false)
  const [ isCpassVisible, setIsCpassVisible ] = useState(false)
  const setMsg = useSetAlert()
  const navigate = useNavigate()

  useEffect(() => {
    setFirstname('')
    setMiddlename('')
    setSurname('')
    setEmail('')
    setPassword('')
    setCpassword('')
    setIsPassVisible(false)
    setIsCpassVisible(false)
  }, [page])

  useEffect(() => {
    console.log(isCpassVisible, isPassVisible)
  }, [isPassVisible, isCpassVisible])

  
  const credentials = page === 'join' ? { firstname, middlename, surname, email, contact, password, cpassword } : { email, password }
  const { login, registration } = useAuth()
  
  const firstnameLabel = <label>
                          <span>Firstname: </span>
                          <input type="text" onChange={ (e) => setFirstname(e.target.value) } value={ firstname } />
                        </label>

  const middlenameLabel = <label>
                            <span>Middlename: </span>
                            <input type="text" onChange={ (e) => setMiddlename(e.target.value) } value={ middlename } />
                          </label>

  const surnameLabel = <label>
                            <span>Surname: </span>
                            <input type="text" onChange={ (e) => setSurname(e.target.value) } value={ surname } />
                          </label>

    const emailLabel = <label>
                            <span>Email: </span>
                            <input type="email" onChange={ (e) => setEmail(e.target.value) } value={ email } />
                          </label>

    const contactLabel = <label className={ styles.contactLabel }>
                            <span>Contact: </span>
                            <input type="number" onChange={ (e) => setContact(e.target.value) } value={ contact } autoComplete="off" />
                          </label>

    const passwordLabel = <label>
                            <span>Password: </span>
                            <input type={ isPassVisible ? 'text' : 'password' } onChange={ (e) => setPassword(e.target.value) } value={ password } />
                            <span className={styles.passwordIconBtn} onClick={ () => toggleIconVisibility('password') }> { !isPassVisible ? hideIcon : showIcon } </span>
                          </label>

    const cpasswordLabel = <label>
                            <span>Confirm password: </span>
                            <input type={ isCpassVisible ? 'text' : 'password' } onChange={ (e) => setCpassword(e.target.value) } value={ cpassword } />
                            <span className={styles.passwordIconBtn} onClick={ () => toggleIconVisibility('cpassword') }> { !isCpassVisible ? hideIcon : showIcon } </span>
                          </label>

const handler = page === 'join' ? registration : login

function toggleIconVisibility(object){
  if(object === 'password'){
      setIsPassVisible(v => !v)
    }
  if(object === 'cpassword'){
      setIsCpassVisible(v => !v)
    }
}

async function handleFormSubmission(e){
  e.preventDefault()

  if(page === 'join'){
    try{
      const res = await handler(credentials, navigate)
      if(res && res.msg) setMsg(res.msg)
      } catch(err) {
    setMsg(err.message)
    }
  } else{
    try{
      const res = await handler(credentials, navigate)
      if(res && res.msg) setMsg(res.msg)
    } catch(err){
      setMsg(err.message)
    }
  }
}

  return (
    <>
      <form onSubmit={ (e) => handleFormSubmission(e) } className={styles.authForm}>
        <h3>
          { page === 'join' ? 'Create an account' : 'Sign in' }
        </h3>
        {
          page === 'join' ? 
            <>
              { firstnameLabel }
              { middlenameLabel }
              { surnameLabel }
              { emailLabel }
              { contactLabel }
              { passwordLabel }
              { cpasswordLabel }
            </> :
            <>
              { emailLabel }
              { passwordLabel }
            </>
        }
        <button className={styles.button}>
          {
            page === 'join' ? 'Sign up' : 'Log in'
          }
        </button>
      </form>
    </>
  )
}