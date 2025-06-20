import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'

export default function SubList({ ACTIONS, currentLocation, dispatchNavigationManager, mainListItems }){
  let main = useMemo(() => dispatchNavigationManager({ type: ACTIONS.GET_MAIN_LIST }), [currentLocation] )
  let sub = useMemo(() => dispatchNavigationManager({ type: ACTIONS.GET_SUB_LIST }), [currentLocation] )
  const classes = useMemo(() => {
    let c = "ml-[1px] mt-[1px] md:bg-gray-200 text-gray-950 md:max-w-[330px]"
    if(mainListItems[main]){
      if(mainListItems[main].message) c += ' flex-1 text-center pt-10 text-2xl font-bold texturina !w-full md:!max-w-full' 
      if(main && sub) c += ' hidden md:!block'
      if(!main) c += ' hidden md:!block'
    }
    return c
  }, [currentLocation, mainListItems])

  return ( 
    <ul 
      className={ classes }>
      { mainListItems[main] && mainListItems[main].message }
      { mainListItems[main]?.list && mainListItems[main]
        .list.map((item, index) => {
          return item.link ? 
            <li key={ index }>
              <Link
                className={ `capitalize justify-between cursor-pointer p-2 not-last:border-b-1
                  border-b-gray-300 h-fit hover:text-white text-base
                  hover:bg-gray-500 grid items-center grid-cols-[1fr_auto] gap-3` 
                }
                to={{
                  pathname: `/courses/${ item.subList.split(' ').join('_') }`
                }}>
                { item.subList }
                <ChevronRight
                  className="w-6 h-6"
                />
              </Link>
            </li> :
            <li 
              key={ index } 
              className={ `capitalize flex items-center justify-between cursor-pointer gap-3 p-2 not-last:border-b-1
                border-b-gray-300 h-fit hover:text-white text-base
                hover:bg-gray-500  ${ index == sub ? 'md:bg-gray-950 md:!text-white' : '' } `
              } 
              onClick={ (e) => dispatchNavigationManager({ type: ACTIONS.SET_CURRENT_SUB_LIST, index }) }>
              { item.subList }
              <ChevronRight />
            </li>  
        })
      }
    </ul> 
  )
}