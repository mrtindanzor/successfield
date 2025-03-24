import Authentication from "../../Components/Authentication/Authentication";
import background from "./../../assets/images/hero.webp";
import styles from "./AuthenticationPage.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AuthenticationPage(){
  let { route } = useParams()
  route = route.toLowerCase().trim()
  const [page, setPage] = useState()

  useEffect(() => { 
    setPage(route) 
    document.title = route === 'join' ? 'Join - Successfield College' : 'Login - Successfield College'
   }, [route])

  return (
    <div className={styles.authPage}>
      <Authentication page={ page } />
      {/* <img src={ background } className={ styles.background }/> */}
    </div>
  )
}