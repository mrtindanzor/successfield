import { useState, useMemo, useCallback, useEffect, useReducer } from 'react'
import useCourses from './../../Contexts/CoursesContext'
import useGetApplications from '../Hooks/GetApplications'
import useServerUri from '../../Contexts/baseServer'
import usePendingLoader from "../../Contexts/PendingLoaderContext"
import { useSetAlert } from "../../Hooks/Alerter"

const ACTIONS = {
  EDITTED: 'editted',
  SET_DEFAULT: 'set_default'
}

function applicationsReducer(state, action){
  const { year, studentNumber } = action
  switch (action.type) {
    case ACTIONS.EDITTED:
        return state.map( applications => {
          if(applications.year !== year) return applications
          return {
            ...applications,
            students: applications.students.filter( student => student.studentNumber !== studentNumber )
          }
        } )
      break;

    case ACTIONS.SET_DEFAULT:
      return action.state
  
    default:
      return state
  }
}

export default function RegistrationCenter(){
  const sections = useMemo(() => [
    {
      title: 'Applications',
      section: <Applications />
    },
    {
      title: 'Courses',
      section: <div/>
    }
  ])
  
  const [ currentPage, setCurrentPage ] = useState(0)

  return (
    <div>
      <ul
        className='flex gap-5 p-5 mb-5'
        >
        { sections.map( (section, key) => {
          return <li key={ key }
            className="inline-block p-2 bg-gray-800 hover:bg-gray-950 text-white uppercase w-fit rounded cursor-pointer"
            onClick={ () => setCurrentPage(key) }
            > { section.title } </li>
        } ) }
      </ul>
      { sections[currentPage].section }
    </div>
  )
}

function Applications(){
  const setMsg = useSetAlert()
  const [ applicationsCount, setApplicationsCount ] = useState(0)
  const { setIsPendingLoading } = usePendingLoader()
  const initialedState = useGetApplications()
  const [ intializing, setIntializing ] = useState(true)
  const [ allApplications, applicationsDispatch ] = useReducer(applicationsReducer, initialedState)
  const uri = useServerUri() + 'users/applications/edit'
  const headers = useMemo(() => {
    const h = new Headers()
    h.append('Content-type', 'application/json')
    return h
  }, [])

  const applicationOperation = useCallback((details) => {
    async function performOperation(){
      const body = JSON.stringify(details)
      try {
        setIsPendingLoading(true)
        const response = await fetch(uri, { headers, method: 'POST', body })
        if(!response.ok) return
        const res = await response.json()
        if(!res.errors) applicationsDispatch({ type: ACTIONS.EDITTED, studentNumber: details.studentNumber })
        setMsg(res.msg)
      } catch (err) {
        setMsg(err.message)
      } finally {
        setIsPendingLoading(false)
      }
    }
    performOperation()
  }, [])

  useEffect(() => {
    if(initialedState && intializing){
      applicationsDispatch({ type: ACTIONS.SET_DEFAULT, state: initialedState })
      if(initialedState?.length > 0) setIntializing(false)
    }
  }, [initialedState])

  useEffect(() => {
    let count = 0
      if(allApplications?.length > 0 && !intializing){
        setIntializing(false)
        allApplications.map( application => {
          application.students.map(() => {
            count++
          })
        })
        setApplicationsCount(count)
      }
  }, [allApplications])

  if(!allApplications || allApplications.length < 1 ) {
    return <p
      className='text-gray-600 font-bold uppercase mx-auto w-fit'
      >
      No current applications
    </p>
  }

  return (
    <>
      { allApplications && allApplications.length > 0 && <h2
    className="text-green-800 font-bold text-2xl border-b-3
    pb-3"
    > Total applications: { applicationsCount } </h2> }
    
      {
         allApplications && allApplications.length > 0 && allApplications.map( application => {
          const { students } = application
          if(students.length > 0){
            return <div
                      className='p-5 border-t-1'
                      >
      
              <h2
                className='font-bold text-2xl mb-5 text-center texturina'
                >Year: { application.term } </h2>
    
              <ul
                className='grid gap-5'
                >
                {
                  students.map( applicant => {
                    const details = { studentNumber: applicant.studentNumber, name: applicant.name, date: applicant.date, year: application.term }
                    return <li
                            key={ applicant._id }
                            className='p-3 border-2 border-gray-200 rounded grid gap-3 bg-gray-200'
                              >
                              <h3
                                className='uppercase font-bold text-xl text-gray-800'
                                > Student Name: { applicant.name } </h3>
                              <h3
                                className='uppercase font-bold text-xl text-gray-800'
                                > Student ID: { applicant.studentNumber } </h3>
                              <h4
                                className='pl-1 uppercase font-semibold'
                                > Chosen programme: 
                                  <span 
                                    className='capitalize block font-normal'
                                    >
                                    { applicant.programme } 
                                  </span>
                                </h4>
                              <div
                                className='flex flex-wrap gap-5'
                                >
                                <img 
                                  src={ applicant.nationalId.secure_url } 
                                  className='w-[200px] h-[200px] rounded object-fit border-1 border-gray-200 overflow-hidden '
                                  />
                                <img 
                                  src={ applicant.userImage.secure_url } 
                                  className='w-[200px] h-[200px] rounded object-fit border-1 border-gray-300 overflow-hidden '
                                  />
                              </div>
    
                              <div 
                                className='flex justify-end gap-2'
                                >
                                <button
                                  className='border-2 border-green-500 hover:border-green-800 rounded px-2 py-1 cursor-pointer text-white bg-green-500 hover:bg-green-800'
                                  onClick={ () => applicationOperation({ operation: 'approve', ...details }) }
                                  > Accept application </button>
                                <button
                                  className='border-2 border-red-500 hover:border-red-800 rounded px-2 py-1 cursor-pointer text-white bg-red-500 hover:bg-red-800'
    onClick={ () => applicationOperation({ operation: 'decline', ...details }) }
      > Decline application </button>
                              </div>
                           </li>
                  })
                }
              </ul>
        </div>
          }
        } )
      }
    </>
  )
}