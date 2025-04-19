import { Menu } from 'lucide-react'
import useAuth from './../../../Contexts/AuthenticationContext/AuthenticationContext'
import useAdminNavigation from '../../Contexts/NavigationContext/NavigationContext'

export default function Header(){
  const { userFullName } = useAuth()
  const { setNavToggle } = useAdminNavigation()

  const menuButtonClasses = "adminMenuBtn w-10 h-10 min-w-fit max-w-fit text-white bg-black border-2 cursor-pointer border-black p-1 rounded"
  const menuClasses = 'bg-green-500 flex gap-5 items-center font-bold sticky top-0 left-0 text-2xl text-white text-shadow-black-1 texturina w-full z-999 overflow-hidden whitespace-nowrap py-4 px-3'

  return (
    <div className={ menuClasses }>
      <Menu className={ menuButtonClasses } onClick={ () => setNavToggle(c => !c) } />
      Admin: { userFullName }
    </div>
  )
}