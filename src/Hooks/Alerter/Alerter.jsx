import styles from "./Alerter.module.css";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

export const AlertMsgContext = createContext()
export const SetAlertMsgContext = createContext()

export function AlertMsgProvider({ children }){
  const [alertMsg, setAlertMsg] = useState()

  return(
    <AlertMsgContext.Provider value={ alertMsg }>
      <SetAlertMsgContext.Provider value={ setAlertMsg }>
        { children }
      </SetAlertMsgContext.Provider>
    </AlertMsgContext.Provider>
  )
}

export default function Alerter(){
  const setAlertMsg = useSetAlert()
  const alertMsg = useAlertMsg()
  useEffect(() => {
    if(alertMsg){
      const time = 5 * 1000
      const timeoutId = setTimeout(() => setAlertMsg(''), time)
      return () =>  clearTimeout(timeoutId)
    }
  },[alertMsg])
  
  return  (alertMsg ? <div className={styles.alerter}> { alertMsg } </div> : null)
}

  export function useSetAlert(){ return useContext(SetAlertMsgContext) } 
  export function useAlertMsg(){ return useContext(AlertMsgContext) }