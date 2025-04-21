import { useEffect } from 'react'
import useAuth from '../../Contexts/AuthenticationContext/AuthenticationContext'
import { capitalize } from '../../core'
import MainList from '../../Components/ProfileItems/MainList/MainList'
import SubList from '../../Components/ProfileItems/SubList/SubList'
import Details from '../../Components/ProfileItems/Details/Details'
import { PendingLoading } from './../../Hooks/Loader/PendingLoader/PendingLoader'
import { User } from 'lucide-react'
import { Link } from 'react-router-dom'

function AdminPanel(){

  return (
    <Link to='/admin' className='block py-1 px-4 rounded w-fit text-gray-800 bg-green-500 mx-auto md:mx-unset transition-border duration-300 ease-in hover:text-white hover:rounded-xl border-2 text-xl font-semibold ' > Admin Panel </Link>
  )
}

export default function Dashboard(){
  const { currentUser, userFullName, userPhoto  } = useAuth()
  const photoClasses = " h-20 w-20 object-cover object-center-top text-white border-2 rounded-full "

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
        <MainList />
        <SubList />
        <Details />
      </div>
    </>
  )
}