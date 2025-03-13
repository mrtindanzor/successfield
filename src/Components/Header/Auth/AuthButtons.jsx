import icons from "../../../Icons/icons.jsx";
import styles from "./AuthButtons.module.css";
import { Link } from "react-router-dom";

const loginBtn = icons.login(styles.loginBtn, 'Log in' )
const signUpBtn = icons.signUp(styles.signUpBtn, 'Sign up' )
const userIcon = icons.userLine(styles.userIcon, 'My Profile')

export default function AuthButtons(){
  return (
    <div className={styles.authBtns}>
      <Link to='/users/students-area' className={styles.loginLink}>
        {loginBtn}
        Log in
      </Link>
      <Link to='/users/join' className={styles.signUpLink}>
        {signUpBtn}
        Sign up
      </Link>
    </div>
  )
}

export function MyProfile(){

  return (
      <div className={styles.profileTab}>
        { userIcon }
        Profile
      </div>
  )
}