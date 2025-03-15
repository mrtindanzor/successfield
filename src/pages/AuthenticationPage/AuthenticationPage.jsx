import Authentication from "../../Components/Authentication/Authentication";
import background from "./../../assets/images/hero.webp";
import styles from "./AuthenticationPage.module.css";
import { useParams } from "react-router-dom";

export default function AuthenticationPage(){
  const { route } = useParams()
  const page = route.toLowerCase().trim()
  document.title = page === 'join' ? 'Join - Successfield College' : 'Login - Successfield College'
  return (
    <div className={styles.authPage}>
      <Authentication page={ page } />
      {/* <img src={ background } className={ styles.background }/> */}
    </div>
  )
}