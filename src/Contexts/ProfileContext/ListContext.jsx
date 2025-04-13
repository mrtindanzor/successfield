import { createContext, useContext, useState } from "react";
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

  return (
    <ProfileListContext.Provider value={ { activeMainList, activeSubList, setActiveMainList, setActiveSubList, mainListItems } }>
      { children }
    </ProfileListContext.Provider>
  )
}

export default function useProfileList(){ return useContext( ProfileListContext ) }