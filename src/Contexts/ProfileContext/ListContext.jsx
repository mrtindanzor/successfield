import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import Name from "../../Components/ProfileItems/Details/Name/Name";
import Email from "../../Components/ProfileItems/Details/Email/Email";
import PhoneNumber from "../../Components/ProfileItems/Details/PhoneNumber/PhoneNumber";
import ChangePassword from "../../Components/ProfileItems/Details/Password/ChangePassword/ChangePassword";
import ResetPassword from "../../Components/ProfileItems/Details/Password/ResetPassword/ResetPassword";
import Certificate from "../../Components/ProfileItems/Details/Certificates/Certificate";
import useAuth from "../AuthenticationContext/AuthenticationContext";


const ProfileListContext = createContext()

export function ProfileListProvider({ children }){
  const { certificates } = useAuth()
  console.log(certificates)
  const mainListItems = useMemo(() => {
    const m = [
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
                        ],
                  },
                  {
                    title: 'My Certifcates',
                    list: certificates?.length ? certificates.map((certificate) => {
                      return {
                        subList: certificate.programme,
                        section: <Certificate key={ certificate._id } { ...{ certificate } } />
                      }
                    }) : [],
                    message: !certificates ? 'You do not have any certificates' : null
                  }
              ]

  return m
  }, [certificates])
  const [activeMainList, setActiveMainList] = useState('')
  const [activeSubList, setActiveSubList] = useState('')

  return (
    <ProfileListContext.Provider value={ { activeMainList, activeSubList, setActiveMainList, setActiveSubList, mainListItems } }>
      { children }
    </ProfileListContext.Provider>
  )
}

export default function useProfileList(){ return useContext( ProfileListContext ) }