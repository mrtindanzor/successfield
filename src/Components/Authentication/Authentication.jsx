import icons from "./../../Icons/icons";
import styles from "./Authentication.module.css";
import useAlerter from "../../Hooks/Alerter/Alerter";
import useAuthentication from "../../Hooks/useAuthentication/useAuthentication";
import { useEffect, useState } from "react";

const hideIcon = icons.eyeClose(styles.passwordIcon, 'Show')
const showIcon = icons.eyeClose(styles.passwordIcon, 'Hide')

async function handleFormSubmission(e, page, handler, setAlert){
  e.preventDefault()

  if(page === 'join'){
    try{
      const response = await handler()
      setAlert(response.msg)
    } catch(err) {
      setAlert(err.message)
    }
  } else{
    try{
      const response = await handler()
      setAlert(response.msg)
    } catch(err){
      setAlert(err.message)
    }
  }
}

export default function Authentication({ page }){
  const [firstname, setFirstname] = useState('')
  const [middlename, setMiddlename] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [passIcon, setPassIcon] = useState(hideIcon)
  const [cpassIcon, setCpassIcon] = useState(hideIcon)
  const { setAlert, Alerter} = useAlerter()
  const credentials = page === 'join' ? { firstname, middlename, surname, email, password, cpassword } : { email, password }
  const { login, registration } = useAuthentication(credentials)
  
  const firstnameLabel = <label>
                          <span>Firstname: </span>
                          <input type="text" onChange={(e) => setFirstname(e.target.value)}/>
                        </label>

  const middlenameLabel = <label>
                            <span>Middlename: </span>
                            <input type="text" onChange={(e) => setMiddlename(e.target.value)}/>
                          </label>

  const surnameLabel = <label>
                            <span>Surname: </span>
                            <input type="text" onChange={(e) => setSurname(e.target.value)}/>
                          </label>

    const emailLabel = <label>
                            <span>Email: </span>
                            <input type="email" onChange={(e) => setEmail(e.target.value)}/>
                          </label>

    const passwordLabel = <label>
                            <span>Password: </span>
                            <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                            <span className={styles.passwordIconBtn}> { passIcon } </span>
                          </label>

    const cpasswordLabel = <label>
                            <span>Confirm password: </span>
                            <input type="password" onChange={(e) => setCpassword(e.target.value)}/>
                            <span className={styles.passwordIconBtn}> { cpassIcon } </span>
                          </label>

  const handler = page === 'join' ? registration : login

  return (
    <>
      <Alerter />
      <form onSubmit={(e) => handleFormSubmission(e, page, handler, setAlert)} className={styles.authForm}>
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