import { ChevronRight } from 'lucide-react'
import { useMemo } from 'react'

export default function SubList({ ACTIONS, currentLocation, dispatchNavigationManager, mainListItems }){
  let main = useMemo(() => dispatchNavigationManager({ type: ACTIONS.GET_MAIN_LIST }), [currentLocation] )
  let sub = useMemo(() => dispatchNavigationManager({ type: ACTIONS.GET_SUB_LIST }), [currentLocation] )
  const classes = useMemo(() => {
    let c = "ml-[1px] mt-[1px] bg-white md:bg-gray-800 md:max-w-[330px]"
    if(mainListItems[main]){
      if(mainListItems[main].message) c += ' flex-1 text-center pt-10 text-2xl font-bold texturina !bg-gray-100 md:!bg-white !w-full md:!max-w-full' 
      if(main && sub) c += ' hidden md:!block'
      if(!main) c += ' hidden md:!block'
    }
    return c
  }, [currentLocation, mainListItems])
  const liClasses = useMemo(() => {
    let li = 'capitalize flex items-center justify-between hover:bg-gray-950 md:text-white cursor-pointer gap-3 p-2 border-b-1 border-b-gray-300 md:border-b-white h-fit'
    return li
  }, [currentLocation, mainListItems])

  return (
    <>
      {
        <ul className={ classes }>
          { mainListItems[main] && mainListItems[main].message }
          { 
            mainListItems[main]?.list && mainListItems[main].list.map((item, index) => {
            return <li key={ index } 
            className={ `${ liClasses }  ${ index == sub ? 'md:bg-gray-950' : '' } ` } 
            onClick={ (e) => dispatchNavigationManager({ type: ACTIONS.SET_CURRENT_SUB_LIST, index }) }>
              { item.subList }
              <ChevronRight />
              </li>
          }) }
        </ul>
      }
    </>
    
  )
}