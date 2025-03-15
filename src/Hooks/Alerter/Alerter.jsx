import styles from "./Alerter.module.css";
import { useEffect, useMemo, useState } from "react";

export default function useAlerter(){
  const [msg, setMsg] = useState('')
  
  useEffect(() => {
    if(msg){
        const time = 5 * 1000
        const timeoutId = setTimeout(() => setMsg(''), time)
        return () =>  clearTimeout(timeoutId)
    }
  },[msg])
  
  function Alerter(){
    return  msg ? <div className={styles.alerter}> { msg } </div> : null
  }

  return { setAlert: setMsg, Alerter }
}