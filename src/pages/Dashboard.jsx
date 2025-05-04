import { useEffect, useReducer, useMemo, useState, useCallback } from 'react'
import useAuth from '../Contexts/AuthenticationContext'
import { capitalize } from '../core'
import MainList from '../Components/ProfileItems/MainList/MainList'
import SubList from '../Components/ProfileItems/SubList/SubList'
import Details from '../Components/ProfileItems/Details/Details'
import { PendingLoading } from '../Hooks/PendingLoader'
import { User } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import Name from "../Components/ProfileItems/Details/Name/Name";
import Email from "../Components/ProfileItems/Details/Email/Email";
import PhoneNumber from "../Components/ProfileItems/Details/PhoneNumber/PhoneNumber";
import ChangePassword from "../Components/ProfileItems/Details/Password/ChangePassword/ChangePassword";
import Certificate from "../Components/ProfileItems/Details/Certificates/Certificate";

const ACTIONS = {
  SET_CURRENT_MAIN_LIST: 'set_current_main_list',
  SET_CURRENT_SUB_LIST: 'set_current_sub_list',
  SET_ACTIVE_DETAILS: 'set_active_details', 
  BACK_TO_SUB_LIST: 'back_to_sub_list',
  BACK_TO_MAIN_LIST: 'back_to_main_list',
  BACK_TO_DASHBOARD: 'back_to_dashboard',
  GET_MAIN_LIST: 'get_main_list',
  GET_SUB_LIST: 'get_sub_list',
  GET_DETAILS: 'get_details'
}

function AdminPanel(){

  return (
    <Link to='/admin' className='block py-1 px-4 rounded w-fit text-gray-800 bg-green-500 mx-auto md:mx-unset transition-border duration-300 ease-in hover:text-white hover:rounded-xl border-2 text-xl font-semibold ' > Admin Panel </Link>
  )
}

export default function Dashboard(){
  const { currentUser, userFullName, userPhoto  } = useAuth()
  const photoClasses = " h-20 w-20 object-cover object-center-top text-white border-2 rounded-full "
  const { certificates } = useAuth()
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
                    title: 'My Certificates',
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
  const [currentLocation, setCurrentLocation] = useSearchParams()
  const dispatchNavigationManager = useCallback((action) => {
    let m = String(currentLocation.get('m') ?? '')
    let s = String(currentLocation.get('s') ?? '')
    let d = String(currentLocation.get('d') ?? '')
      switch (action.type) {
        case ACTIONS.SET_CURRENT_MAIN_LIST:
          setCurrentLocation({ m: action.index.toString() })
        break
      
        case ACTIONS.SET_CURRENT_SUB_LIST:
          setCurrentLocation({ m, s: action.index.toString() })
        break;
    
        case ACTIONS.SET_ACTIVE_DETAILS: 
        setCurrentLocation({ m, s, d: action.index.toString() })
        break
    
        case ACTIONS.BACK_TO_SUB_LIST:
          setCurrentLocation({ m, s })
        break
    
        case ACTIONS.BACK_TO_MAIN_LIST:
          setCurrentLocation({ m })
        break
    
        case ACTIONS.BACK_TO_DASHBOARD:
          setCurrentLocation({})
        break

        case ACTIONS.GET_MAIN_LIST:
          return m

        case ACTIONS.GET_SUB_LIST:
          return s
        
        case ACTIONS.GET_DETAILS:
          return d
      }
  }, [currentLocation])
  const listProps = useMemo(() => ({ ACTIONS, currentLocation, dispatchNavigationManager, mainListItems }), [certificates, currentLocation])

  useEffect(() => {
    if(userFullName) document.title = capitalize('Dashboard - ' + userFullName )
  }, [userFullName])

  if(!currentUser) return <PendingLoading />
  
  return (
    <> 
      <div className=" flex flex-col md:flex-row text-center border-b-1 border-b-white md:text-left items-center gap-5 p-4 bg-gray-800 ">
        {
          !userPhoto ? <User className={ photoClasses } /> : <img loading='lazy' src={ userPhoto } className={ photoClasses } />
        }
        <div className=' grid gap-3 '>
          <b className=' text-white texturina text-shadow-black-1 text-3xl '> { userFullName } </b>
          <span className=" uppercase text-base text-gray-300 font-bold "> <span>Student ID: </span>{ currentUser.studentNumber } </span>
          { currentUser.admin && <AdminPanel />  }
        </div>
      </div>
      <div className=" md:flex ">
        <MainList { ...{ ...listProps } } />
        <SubList { ...{ ...listProps } } />
        <Details { ...{ ...listProps } } />
      </div>
    </>
  )
}