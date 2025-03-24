import icons from "./../../Icons/icons";
import styles from "./Authentication.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetAlert } from "../../Hooks/Alerter/Alerter";
import useAuth from './../../Contexts/AuthenticationContext/AuthenticationContext'

const hideIcon = icons.eyeClose(styles.passwordIcon, 'Show')
const showIcon = icons.eyeClose(styles.passwordIcon, 'Hide')


export default function Authentication({ page }){
  const [firstname, setFirstname] = useState('')
  const [middlename, setMiddlename] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [passIcon, setPassIcon] = useState(hideIcon)
  const [cpassIcon, setCpassIcon] = useState(hideIcon)
  const setMsg = useSetAlert()
  const navigate = useNavigate()

  useEffect(() => {
    setFirstname('')
    setMiddlename('')
    setSurname('')
    setEmail('')
    setPassword('')
    setCpassword('')
  }, [page])

  
  const credentials = page === 'join' ? { firstname, middlename, surname, email, password, cpassword } : { email, password }
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

    const passwordLabel = <label>
                            <span>Password: </span>
                            <input type="password" onChange={ (e) => setPassword(e.target.value) } value={ password } />
                            <span className={styles.passwordIconBtn}> { passIcon } </span>
                          </label>

    const cpasswordLabel = <label>
                            <span>Confirm password: </span>
                            <input type="password" onChange={ (e) => setCpassword(e.target.value) } value={ cpassword } />
                            <span className={styles.passwordIconBtn}> { cpassIcon } </span>
                          </label>

const handler = page === 'join' ? registration : login
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