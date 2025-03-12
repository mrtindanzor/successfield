import icons from "../../../Icons/icons.jsx";
import styles from "./AuthButtons.module.css";
import { Link } from "react-router-dom";

const loginBtn = icons.login(styles.loginBtn, 'Login' )
const signUpBtn = icons.signUp(styles.signUpBtn, 'Sign Up' )

export default function AuthButtons(){
  return (
    <div className={styles.authBtns}>
      <Link to='/users/students-area' className={styles.loginLink}>
        {loginBtn}
        Login
      </Link>
      <Link to='/users/join' className={styles.signUpLink}>
        {signUpBtn}
        Sign Up
      </Link>
    </div>
  )
}