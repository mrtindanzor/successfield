import { X } from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const AlertMsgContext = createContext()
export const SetAlertMsgContext = createContext()

export function AlertMsgProvider({ children }){
  const [alertMsg, setAlertMsg] = useState("")

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
  const alertMsg = useAlertMsg("")
  const classes = useMemo(() => " fixed z-10000 w-[95vw] max-w-[400px] top-14 right-3 bg-green-500 text-white border-1 pr-7 border-l-7 uppercase border-gray-600 py-2 px-3 ",[])
  useEffect(() => {
    if(alertMsg){
      const time = 5 * 1000
      const timeoutId = setTimeout(() => setAlertMsg(''), time)
      return () =>  clearTimeout(timeoutId)
    }
  },[alertMsg])
  
  return  (alertMsg ? <div className={ classes }>
     { alertMsg } 
     <X className="absolute right-1 top-1 cursor-pointer text-gray-500 hover:text-gray-700 rounded w-9 h-9" onClick={ () => setAlertMsg('') } />
     </div> : null)
}

  export function useSetAlert(){ return useContext(SetAlertMsgContext) } 
  export function useAlertMsg(){ return useContext(AlertMsgContext) }
