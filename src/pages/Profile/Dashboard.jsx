import { useEffect } from 'react'
import useAuth from '../../Contexts/AuthenticationContext/AuthenticationContext'
import { capitalize } from '../../core'
import MainList from '../../Components/ProfileItems/MainList/MainList'
import SubList from '../../Components/ProfileItems/SubList/SubList'
import Details from '../../Components/ProfileItems/Details/Details'
import { PendingLoading } from './../../Hooks/Loader/PendingLoader/PendingLoader'
import { User } from 'lucide-react'

export default function Dashboard(){
  const { currentUser, userFullName, userPhoto  } = useAuth()
  const photoClasses = " h-20 w-20 object-cover object-center-top text-gray-700 border-2 rounded-full "

  useEffect(() => {
    if(userFullName) document.title = capitalize('Dashboard - ' + userFullName )
  }, [userFullName])

  if(!currentUser) return <PendingLoading />
  
  return (
    <> 
      <div className=" flex flex-col md:flex-row text-center md:text-left items-center gap-5 p-4 bg-green-300 ">
        {
          !userPhoto ? <User className={ photoClasses } /> : <img src={ userPhoto } className={ photoClasses } />
        }
        <div className=' grid gap-3 '>
          <b className=' text-white texturina text-shadow-black-1 text-3xl '> { userFullName } </b>
          <span className=" uppercase text-base font-bold "> <span>Student ID: </span>{ currentUser.studentNumber } </span>
        </div>
      </div>
      <div className=" md:flex ">
        <MainList />
        <SubList />
        <Details />
      </div>
    </>
  )
}