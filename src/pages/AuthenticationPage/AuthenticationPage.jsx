import styles from "./AuthenticationPage.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Registration from "../../Components/Authentication/Registration/Registration";
import Login from "../../Components/Authentication/Login/Login";

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
      {
        page === 'join' ? <Registration /> : <Login />
      }
    </div>
  )
}