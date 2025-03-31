import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import Courses from "../../Sections/CoursesSection/Courses";


const NavigationContext = createContext()

export function NavigationProvider({ children }){
  const NavItems = [
    { title: 'Courses', section: <Courses /> },
    { title: 'Registration Center', section: <div></div> },
    { title: 'Certificates', section: <div></div> },
    { title: 'Partners', section: <div></div> },
    { title: 'Students', section: <div></div> },
  ]
  const [ currentTab, setCurrentTab ] = useState(0)
  const [ tabDetails, setTabDetails ] = useState(NavItems[0].section)

  useEffect(() => {
    setTabDetails(NavItems[currentTab].section)
  }, [currentTab])

  return (
    <NavigationContext.Provider value={ { NavItems, currentTab, tabDetails, setCurrentTab } }>
      { children }
    </NavigationContext.Provider>
  )
}

export default function useAdminNavigation(){ return useContext( NavigationContext )}