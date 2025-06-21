import { useEffect, useReducer, useMemo, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector } from '../Slices/userSlice'
import { getCourseByCode } from '../Slices/coursesSlice'
import { capitalize } from '../core'
import MainList from '../Components/ProfileItems/MainList'
import SubList from '../Components/ProfileItems/SubList'
import Details from '../Components/ProfileItems/Details'
import { Loading as Loader } from '../Components/Loader'
import { User } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import Name from "../Components/ProfileItems/Name";
import Email from "../Components/ProfileItems/Email";
import PhoneNumber from "../Components/ProfileItems/PhoneNumber";
import ChangePassword from "../Components/ProfileItems/ChangePassword";
import Certificate from "../Components/Certificate";

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

function AdminPanelButton(){

  return (
    <Link 
      to='/admin'
      className={`block py-1 px-4 rounded w-fit text-gray-800 bg-green-500 mx-auto md:mx-unset 
        transition-border duration-300 ease-in hover:text-white 
        hover:rounded-xl border-2 text-xl font-semibold`}>
        Admin Panel 
    </Link>
  )
}

export default function Dashboard(){
  const dispatch = useDispatch()
  const { user, courses, userFullName, certificates, userPhoto, loading  } = useSelector( userSelector )
  const [ userImageLoaded, setUserImageLoaded ] = useState(false)
  const [currentLocation, setCurrentLocation] = useSearchParams()

  const mainListItems = useMemo(() => {
    const m = [
      {
        title: 'Account Information',
        list: [ { 
            subList: 'Name',
            section: <Name />
          },
          { 
            subList: 'Email',
            section: <Email />
          },
          { 
            subList: 'Phone number', 
            section: <PhoneNumber />
          },
          { 
            subList: 'Change password',
            section: <ChangePassword />
        }],
      },
      {
        title: 'My Certificates',
        list: certificates?.length ? certificates.map((certificate) => ({
            subList: certificate.programme,
            section: <Certificate key={ certificate._id } { ...{ certificate } } />
          })) : [],
        message: !certificates ? 'You do not have any certificates' : null
      },
      {
        title: 'My Courses',
        list: courses && courses.length > 0 ? courses.map((course) => {
          return {
            subList: course,
            link: true
          }
        }) : [],
        message: !courses || courses?.length < 1 ? 'You have not been enrolled in any course.' : null
      },
      { title: 'Log out', Logout: true }
    ]

  return m
  }, [user, certificates, courses])

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

  const main = useMemo(() => dispatchNavigationManager({ type: ACTIONS.GET_MAIN_LIST }), [currentLocation] )

  useEffect(() => {
    document.title = capitalize(`Successfield | ${ mainListItems[main]?.title || 'Profile' }`)
  }, [main])

  if(loading) return <Loader />
  
  return (
    <main-content
      className="h-[100vh] w-[100vw] grid grid-rows-[auto_1fr] mx-auto"> 
      <div className="flex flex-col md:bg-gray-200 px-5 sm:px-8 md:px-10 w-full md:flex-row text-center items-center md:items-start md:text-left gap-5 py-4">
        { !userPhoto ? <User 
            className="h-20 w-20 object-cover object-center-top text-gray-950 border-2 rounded-full" /> 
            : <img 
                loading='lazy'
                onLoad={ () => setUserImageLoaded(true) }
                src={ userPhoto } 
                className={`${ userImageLoaded && '!opacity-100 transition duration-4000 ease-linear' } 
                opacity-0 h-20 w-20 object-cover object-center-top text-gray-950 border-2 rounded-full`} 
              /> }
        <div className='grid gap-3'>
          <b className=' text-gray-950 texturina text-3xl '> { userFullName } </b>
          <span 
            className=" uppercase text-base text-gray-400 font-bold "> 
            <span>
              Student ID: 
            </span> { user.studentNumber } 
          </span>
          { user.admin && <AdminPanelButton />  }
        </div>
      </div>
      <div className="w-full md:flex mx-auto px-5 sm:px-8 md:px-0  md:bg-gray-100">
        <MainList { ...{ ...listProps } } />
        <SubList { ...{ ...listProps } } />
        <Details { ...{ ...listProps } } />
      </div>
    </main-content>
  )
}
