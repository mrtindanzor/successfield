import icons from "../../../Icons/icons.jsx";
import styles from "./AuthButtons.module.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../Hooks/useAuthentication/useAuthentication";

const loginBtn = icons.login(styles.loginBtn, 'Log in' )
const signUpBtn = icons.signUp(styles.signUpBtn, 'Sign up' )
const userIcon = icons.userLine(styles.userIcon, 'My Profile')

function NotLoggedIn(){
  return (
    <div className={ styles.authBtns }>
      <NavLink to='/users/students-area' className={ styles.loginLink }>
        { loginBtn }
        Log in
      </NavLink>
      <NavLink to='/users/join' className={ styles.signUpLink }>
        { signUpBtn }
        Sign up
      </NavLink>
    </div>
  )
}

function MyProfile(){

  return (
      <div className={ styles.profileTab }>
        { userIcon }
        Profile
      </div>
  )
}

export default function AuthButtons(){
  const { isLoggedIn, initialFetch } = useAuth()

  return (
    <>
      
      { !initialFetch && isLoggedIn && <MyProfile /> }
      { !initialFetch && !isLoggedIn && <NotLoggedIn /> }
    </>
  )
}