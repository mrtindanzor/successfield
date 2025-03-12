import icons from "../../../Icons/icons";
import styles from "./Logo.module.css";
import { Link } from "react-router-dom";

const appLogo = icons.logo(styles.logo, 'Successfield College')
export default function Logo(){
  return (
    <Link to='/' className={styles.logoContainer}>
      {appLogo}
      <h2 className={styles.logoText}>Successfield College</h2>
    </Link>
  )
}