import { useMemo } from "react"

export default function Details({ ACTIONS, currentLocation, dispatchNavigationManager, mainListItems }){
  let main = useMemo(() => dispatchNavigationManager({ type: ACTIONS.GET_MAIN_LIST }), [currentLocation] )
  let sub = useMemo(() => dispatchNavigationManager({ type: ACTIONS.GET_SUB_LIST }), [currentLocation] )
  const classes = useMemo(() => {
    let c = "flex-1"
    if(sub === '') c += " hidden md:block"
    return c
  }, [currentLocation])

  return (
    <>
      {
        sub && mainListItems[main].list && mainListItems[main].list[sub] ? <div className={ classes }>
          { mainListItems[main].list[sub].section }
        </div> : null
      }
    </>
  )
}