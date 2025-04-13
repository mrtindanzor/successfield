import { useEffect } from 'react'
import useAuth from '../../Contexts/AuthenticationContext/AuthenticationContext'
import { capitalize } from '../../core'
import MainList from '../../Components/ProfileItems/MainList/MainList'
import SubList from '../../Components/ProfileItems/SubList/SubList'
import Details from '../../Components/ProfileItems/Details/Details'
import { User } from 'lucide-react'
import useProfileList from '../../Contexts/ProfileContext/ListContext'

export default function Dashboard(){
  const { currentUser, userFullName } = useAuth()
  const { activeMainList, activeSubList } = useProfileList()

  useEffect(() => {
    document.title = capitalize('Dashboard - ' + userFullName )
  }, [currentUser])
  
  return (
    <> 
      <div className=" flex flex-col md:flex-row text-center md:text-left items-center gap-5 p-4 bg-green-300 ">
        <User className=' h-20 w-20 p-3 text-gray-700 border-2 rounded-full ' />
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