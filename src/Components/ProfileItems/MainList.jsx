import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import useAuth from './../../Contexts/AuthenticationContext'

export default function MainList({ ACTIONS, dispatchNavigationManager, currentLocation, mainListItems }){
  const { logout } = useAuth()
  let main = useMemo(() => dispatchNavigationManager({ type: ACTIONS.GET_MAIN_LIST }), [currentLocation] )
  let sub = useMemo(() => dispatchNavigationManager({ type: ACTIONS.GET_SUB_LIST }), [currentLocation] )
  const handleBackBtn = useCallback(() => {
    if(sub) return dispatchNavigationManager({ type: ACTIONS.BACK_TO_MAIN_LIST })
    dispatchNavigationManager({ type: ACTIONS.BACK_TO_DASHBOARD })
  }, [currentLocation])

  return (
    <section
      className='md:bg-gray-300'
      >
      { ( sub || main ) && <button onClick={ handleBackBtn } className=' bg-gray-700 text-white flex justify-center py-1 px-3 items-center cursor-pointer my-3 md:hidden rounded-tl-sm rounded-bl-sm '> 
      <ChevronLeft className=' w-8 h-8 ' /> 
      </button> }
      <ul className={ `${ sub || main ? 'hidden md:block' : '' } h-fit border-none` }>
      {
        mainListItems.map((item, index) => {
          return <li 
            key={ index } 
            className={`flex gap-3 justify-between items-center hover:bg-gray-500 
              hover:text-white cursor-pointer md:text-gray-950 w-full  p-2 not-last:border-b-1 text-base
              border-b-gray-300 ${ index == main ? 'md:bg-gray-950 md:!text-white' : '' }
            `} 
          onClick={ (e) => {
            if(item.Logout) logout()
            if(!item.Logout) dispatchNavigationManager({ type: ACTIONS.SET_CURRENT_MAIN_LIST, index })
          } }>
            { item.title }
            { !item.Logout && <ChevronRight /> } 
          </li>
        })
      }
    </ul>
    </section>
  )
}