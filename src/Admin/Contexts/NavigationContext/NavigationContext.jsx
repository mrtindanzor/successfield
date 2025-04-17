import { useContext, useEffect, useReducer, useState } from "react";
import { createContext } from "react";
import Courses from "../../Sections/CoursesSection/Courses";

function navReducer(state, action){
  switch(action.type){
    case 'switch_tab':
      return action.navItems[action.index].section

    default:
      return state
  }
}


const NavigationContext = createContext()

export function NavigationProvider({ children }){
  const NavItems = [
    { title: 'Courses', section: <Courses /> },
    { title: 'Registration Center', section: <div></div> },
    { title: 'Certificates', section: <div></div> },
    { title: 'Partners', section: <div></div> },
    { title: 'Students', section: <div></div> },
  ]
  const [ currentTab, currentTabDispatch ] = useReducer(navReducer, NavItems[0].section)
  const [ navToggle, setNavToggle ] = useState(false)

  return (
    <NavigationContext.Provider value={ { NavItems, currentTab, currentTabDispatch, navToggle, setNavToggle } }>
      { children }
    </NavigationContext.Provider>
  )
}

export default function useAdminNavigation(){ return useContext( NavigationContext )}