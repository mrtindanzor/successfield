import { useSelector } from 'react-redux'
import { userSelector } from '../../Slices/userSlice'
import LogoElement from '../../Components/Header/Logo'

export default function Header(){
  const { userFullName } = useSelector( userSelector )

  return (
    <div 
      className="bg-white sm:col-span-2 flex gap-1 items-center font-bold sticky top-0 left-0 text-2xl text-gray-800 texturina w-full z-999 overflow-hidden rounded-b whitespace-nowrap py-4 px-5 sm:px-5 md:px-10 drop-shadow-md"
      >
      <LogoElement />
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