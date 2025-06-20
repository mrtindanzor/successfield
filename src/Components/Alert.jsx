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
      className={`${ !alertMessage ? 'hidden':'' } fixed z-10000 w-[95vw] grid items-center grid-cols-[1fr_auto] top-20 drop-shadow-gray-500 drop-shadow-md right-1/2 translate-x-1/2 bg-gray-200 text-black tuffy-bold rounded-sm border-2 uppercase border-gray-300 py-2 px-3`}>
      { alertMessage } 
      <X 
        tabIndex={0}
        className="cursor-pointer text-gray-500 hover:text-gray-700"
        onClick={ () => dispatch( setAlertMessage('') ) }
        onKeyDown={ e => { if(e.key === 'Enter') dispatch( setAlertMessage('') ) } }
      />
    </div>)
}
