import icons from "../../../Icons/icons.jsx";
import styles from "./AuthButtons.module.css";
import { NavLink, Link } from "react-router-dom";
import useAuth from './../../../Contexts/AuthenticationContext/AuthenticationContext'
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
      <Link to='/dashboard/profile' className={ styles.profileTab }>
        { userIcon }
        Profile
      </Link>
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