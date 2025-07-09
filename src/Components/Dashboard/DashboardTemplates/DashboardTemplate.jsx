import {useState } from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '../../../Slices/userSlice'
import { Loading as Loader } from '../../Loader'
import { Settings2, User } from 'lucide-react'
import { Link } from 'react-router-dom'

function AdminPanelButton(){
  return (
    <Link 
      to='/admin'
      className={`flex items-center gap-2 py-1 px-4 rounded 
        transition-border duration-200 ease-in hover:bg-gray-300
        hover:rounded-xl border-2 text-xl font-semibold`}>
        <Settings2 />
        <span>
          Control panel
        </span>
    </Link>
  )
}

export default function DashboardTemplate({ children }){
  const { user, userFullName, userPhoto, loading  } = useSelector( userSelector )

  if(loading) return <Loader />
  
  return (
    <section
      className="min-h-screen w-screen grid mx-auto"> 
      <div className="flex flex-col md:bg-gray-200 w-full md:flex-row text-center items-center md:items-start md:text-left gap-5 py-4">
        { !userPhoto ? <User 
            className="h-20 w-20 object-cover object-center-top text-gray-950 border-2 rounded-full" /> 
            : <img 
                loading='lazy'
                src={ userPhoto } 
                className={`h-20 w-20 object-cover object-center-top text-gray-950 border-2 rounded-full`} 
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
      <div className="w-full md:flex mx-auto bg-gray-100">
        { children }
      </div>
    </section>
  )
}
