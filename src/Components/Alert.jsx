import { X } from "lucide-react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setAlertMessage, alertMessageSelector } from '../Slices/settingsSlice'

export default function Alert(){
  const dispatch = useDispatch()
  const alertMessage = useSelector( alertMessageSelector )
  useEffect(() => {
    if(alertMessage){
      const time = 5 * 1000
      const timeoutId = setTimeout(() => dispatch( setAlertMessage('') ), time)
      return () =>  clearTimeout(timeoutId)
    }
  },[alertMessage])
  
  return  (
    <div 
      className={`${ !alertMessage ? 'hidden':'' } fixed z-10000 w-[95vw] max-w-2xl grid items-center grid-cols-[1fr_auto] top-20 drop-shadow-gray-800 drop-shadow-md right-2 bg-gray-200 border-2 border-gray-950 text-gray-950 tuffy-bold rounded-sm uppercase py-2 px-3`}>
      { alertMessage } 
      <X 
        tabIndex={0}
        className="cursor-pointer text-gray-900 hover:text-gray-700"
        onClick={ () => dispatch( setAlertMessage('') ) }
        onKeyDown={ e => { if(e.key === 'Enter') dispatch( setAlertMessage('') ) } }
      />
    </div>)
}
