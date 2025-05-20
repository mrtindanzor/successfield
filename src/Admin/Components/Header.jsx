import { Menu } from 'lucide-react'
import useAuth from './../../Contexts/AuthenticationContext'

export default function Header(){
  const { userFullName } = useAuth()

  return (
    <div 
      className="bg-white sm:col-span-2 flex gap-5 items-center font-bold sticky top-0 left-0 text-2xl text-gray-800 texturina w-full z-999 overflow-hidden rounded-b whitespace-nowrap py-1 sm:py-3 px-2"
      >
      <div
        className="overflow-hidden"
        >
        <span
        className="block [animation:_scrolltext_10s_linear_infinite] md:[animation:_unset] [-webkit-animation:_scrolltext_10s_linear_infinite]"
        > Admin: { userFullName } </span>
      </div>
    </div>
  )
}