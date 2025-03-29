import { createContext, useContext, useState, useRef } from "react";
import icons from './../../Icons/icons'
import styles from './ListContext.module.css'
import Name from "../../Components/ProfileItems/Details/Name/Name";
import Email from "../../Components/ProfileItems/Details/Email/Email";
import PhoneNumber from "../../Components/ProfileItems/Details/PhoneNumber/PhoneNumber";
import ChangePassword from "../../Components/ProfileItems/Details/Password/ChangePassword/ChangePassword";
import ResetPassword from "../../Components/ProfileItems/Details/Password/ResetPassword/ResetPassword";


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
        { subList: 'Change password',
          section: <ChangePassword />
         },
        { subList: 'Reset password',
          section: <ResetPassword />
         },
      ]
    },
    {
      title: 'My Courses',
    },
    {
      title: 'My Certificates',
    },
]
  const [activeMainList, setActiveMainList] = useState('')
  const [activeSubList, setActiveSubList] = useState('')
  const arrowRight = icons.arrowRight(styles.arrowRight, 'More')
  const arrowLeft = icons.arrowLeft(styles.arrowRight, 'More')

  return (
    <ProfileListContext.Provider value={ { activeMainList, activeSubList, setActiveMainList, setActiveSubList, mainListItems, arrowRight, arrowLeft } }>
      { children }
    </ProfileListContext.Provider>
  )
}

export default function useProfileList(){ return useContext( ProfileListContext ) }