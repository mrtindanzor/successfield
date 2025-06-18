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
  useEffect(() => {
    if(alertMsg){
      const time = 5 * 1000
      const timeoutId = setTimeout(() => setAlertMsg(''), time)
      return () =>  clearTimeout(timeoutId)
    }
  },[alertMsg])
  
  return  (
    <div 
      className={`${ !alertMsg ? 'hidden':'' } fixed z-10000 w-[95vw] grid items-center grid-cols-[1fr_auto] top-20 drop-shadow-gray-500 drop-shadow-md right-1/2 translate-x-1/2 bg-gray-200 text-black tuffy-bold rounded-sm border-2 uppercase border-gray-300 py-2 px-3`}>
      { alertMsg } 
      <X 
        className="cursor-pointer text-gray-500 hover:text-gray-700" 
        onClick={ () => setAlertMsg('') }
      />
    </div>)
}

  export function useSetAlert(){ return useContext(SetAlertMsgContext) } 
  export function useAlertMsg(){ return useContext(AlertMsgContext) }
