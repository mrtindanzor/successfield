import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useMemo } from 'react'

export default function MainList({ ACTIONS, dispatchNavigationManager, currentLocation, mainListItems }){
  let main = useMemo(() => dispatchNavigationManager({ type: ACTIONS.GET_MAIN_LIST }), [currentLocation] )
  let sub = useMemo(() => dispatchNavigationManager({ type: ACTIONS.GET_SUB_LIST }), [currentLocation] )
  const handleBackBtn = useCallback(() => {
    if(sub) return dispatchNavigationManager({ type: ACTIONS.BACK_TO_MAIN_LIST })
    dispatchNavigationManager({ type: ACTIONS.BACK_TO_DASHBOARD })
  }, [currentLocation])
  const classes = useMemo(() => {
    let c = `${ sub || main ? 'hidden md:block' : '' } bg-white md:bg-gray-800 mt-[1px] md:min-h-100 md:max-w-[fit-content]`
    return c
  } , [currentLocation])

  return (
    <>
      { ( sub || main ) && <button onClick={ handleBackBtn } className=' bg-gray-400 flex justify-center p-1 items-center text-gray-800 cursor-pointer m-3 md:hidden rounded-tl-lg rounded-bl-lg '> 
      <ChevronLeft className=' w-8 h-8 ' /> 
      </button> }
      <ul className={ classes }>
      {
        mainListItems.map((item, index) => {
          return <li 
            key={ index } 
            className={`flex gap-3 justify-between items-center hover:bg-gray-950 cursor-pointer md:text-white w-full  p-2 border-b-1 border-b-gray-300 md:border-b-white ${ index == main ? 'md:bg-gray-950' : '' }
            `} 
          onClick={ (e) => dispatchNavigationManager({ type: ACTIONS.SET_CURRENT_MAIN_LIST, index }) }>
            { item.title }
            <ChevronRight />
          </li>
        })
      }
    </ul>
    </>
  )
}