import icons from "../../../Icons/icons.jsx";
import styles from "./AuthButtons.module.css";
import useAuthentication from "../../../Hooks/useAuthentication/useAuthentication";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const loginBtn = icons.login(styles.loginBtn, 'Log in' )
const signUpBtn = icons.signUp(styles.signUpBtn, 'Sign up' )
const userIcon = icons.userLine(styles.userIcon, 'My Profile')

function NotLoggedIn(){
  return (
    <div className={styles.authBtns}>
      <NavLink to='/users/students-area' className={styles.loginLink}>
        {loginBtn}
        Log in
      </NavLink>
      <NavLink to='/users/join' className={styles.signUpLink}>
        {signUpBtn}
        Sign up
      </NavLink>
    </div>
  )
}

function MyProfile(){

  return (
      <div className={styles.profileTab}>
        { userIcon }
        Profile
      </div>
  )
}

export default function AuthButtons(){
  const { isLoggedIn, initialRefreshPending } = useAuthentication()
  const [loggedIn, setLoggedIn] = useState(isLoggedIn)

  useEffect(() => {
    setLoggedIn(isLoggedIn)
  },[isLoggedIn])

  return !initialRefreshPending ? loggedIn ? <MyProfile /> : <NotLoggedIn /> : null
}