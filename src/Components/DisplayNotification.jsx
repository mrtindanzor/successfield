import { useRef, useState, useEffect } from "react"
import { X } from "lucide-react"

const DisplayNotification = ({ feedback }) => {
  const [ notification, setNotification ] = useState(null)
  const TimeoutId = useRef()

  useEffect(() => {
    feedback && setNotification(feedback)
    TimeoutId.current = setTimeout(() => setNotification(null), 7000)

    return () => clearTimeout(TimeoutId.current)
  }, [feedback])

  return notification && <span
    className={`${ notification.error && 'bg-red-500' } ${ notification.success && 'bg-green-500' } grid grid-cols-[1fr_auto] gap-2 pl-5 pr-2 py-2 text-lg font-bold text-white capitalize rounded`}
    >
      <span> { notification.message } </span>
      <X
        onClick={ () => setNotification(null)}
        className="cursor-pointer w-8 h-8"
        />
    </span>
}


export default DisplayNotification
