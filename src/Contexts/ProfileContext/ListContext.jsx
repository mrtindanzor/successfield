import { createContext, useContext, useState, useRef } from "react";
import icons from './../../Icons/icons'
import styles from './ListContext.module.css'
import Name from "../../Components/ProfileItems/Details/Name/Name";
import Email from "../../Components/ProfileItems/Details/Email/Email";
import PhoneNumber from "../../Components/ProfileItems/Details/PhoneNumber/PhoneNumber";


const ProfileListContext = createContext()

export function ProfileListProvider({ children }){
  const mainListItems = [
    {
      title: 'Account Information',
      list: [
        { subList: 'Name',
          section: <Name />
         },
        { subList: 'Email',
          section: <Email />
         },
        { subList: 'Phone number', 
          section: <PhoneNumber />
         },
        { subList: 'Change password' },
        { subList: 'Reset password' },
      ]
    },
    {
      title: 'My Courses',
      list: [
        { subList: 'Name' }
      ]
    },
    {
      title: 'My Certificates',
      list: [
        { subList: 'Name' }
      ]
    },
]
  const [activeMainList, setActiveMainList] = useState('')
  const [activeSubList, setActiveSubList] = useState('')
  const arrowRight = icons.arrowRight(styles.arrowRight, 'More')
  const dashboardRef = useRef()

  return (
    <ProfileListContext.Provider value={ { activeMainList, activeSubList, setActiveMainList, setActiveSubList, mainListItems, arrowRight, dashboardRef } }>
      { children }
    </ProfileListContext.Provider>
  )
}

export default function useProfileList(){ return useContext( ProfileListContext ) }