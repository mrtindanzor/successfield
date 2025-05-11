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
      section: <CourseRegistration />
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
  
  if(applicationsCount < 1) {
    return <p
      className='text-gray-600 font-bold uppercase mx-auto w-fit'
      >
      No current applications
    </p>
  }

  return (
    <>
      { applicationsCount > 0 && <h2
    className="text-green-800 font-bold text-2xl border-b-3
    pb-3"
    > Total applications: { applicationsCount } </h2> }
      {
         applicationsCount > 0 && allApplications.map( application => {
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
                                className='flex justify-center'
                                >
                                <img 
                                  src={ applicant.userImage.secure_url } 
                                  className='max-h-[200px] aspect-[1/1] rounded border-1 border-gray-300 overflow-hidden '
                                  />
                                <img 
                                  src={ applicant.nationalId.secure_url } 
                                  className='max-h-[200px] block aspect-[5/2] rounded border-1 border-gray-200 overflow-hidden '
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

function CourseRegistration(){
  const setMsg = useSetAlert()
  const { setIsPendingLoading } = usePendingLoader()
  const uri = useServerUri() + 'users/courses/register'
  const { coursesList } = useCourses()
  const [ listVisible, setListVisible ] = useState(false)
  const [ currentOperation, setCurrentOperation ] = useState({ studentNumber: '', programme: '' })
  const headers = useMemo(() => {
    const h = new Headers()
    h.append('Content-Type', 'application/json')
    return h
  }, [])

  async function handleOperation(e){
    e.preventDefault()

    try {
      setIsPendingLoading(true)
      const method = 'POST'
      const body = JSON.stringify( currentOperation )
      const options = {
        method,
        headers,
        body
      }

      const response = await fetch(uri, options)
      if(!response.ok) return setMsg('Something went wrong')
      const res = await response.json()
      setMsg(res.msg)
      if(res.status === 201) setCurrentOperation( prev => ({ ...prev, programme: '' }) )
    } catch (err) {
      setMsg(err.message)
    } finally {
      setIsPendingLoading(false)
    }
  }

  return (
    <form onSubmit={ handleOperation }
      className='grid gap-3 p-3'
    >
      <label 
        className='grid gap-3'
        >
        <span
          className='uppercase font-bold'
          > Student ID: </span>
        <input
          onChange={ e => setCurrentOperation( prev => ({ ...prev, studentNumber: e.target.value }) ) }
          value={ currentOperation.studentNumber }
          className='border-2 rounded min-w-[200px] px-3 py-1'
          />
      </label>
      <label 
        className='grid gap-3'
        >
        { currentOperation.programme && <span
            className='font-semibold text-lg capitalize'
            > Programme: <br/> { currentOperation.programme } </span> }
        <span
          className='bg-gray-800 text-white px-2 py-1 cursor-pointer rounded'
          onClick={ () => setListVisible( v => !v ) }
          > Choose programme </span>
        <ul
          className={ `mx-3 ${ listVisible && 'border-1' } bg-white` }
          >
          {
            listVisible && coursesList?.length > 0 && coursesList.map( course => {
              return <li key={ course.course }
                className='cursor-pointer p-1 capitalize border-b-1 first:border-t-1 hover:text-white hover:bg-gray-800'
                onClick={ () => {
                  setCurrentOperation( prev => ({ ...prev, programme: course.course }) )
                  setListVisible( false )
                } }
                > { course.course } </li>
            } )
          }
        </ul>
      </label>
      {
        currentOperation.studentNumber && currentOperation.programme && <button
          className='p-2 block font-bold text-lg uppercase bg-green-500 text-white rounded cursor-pointer hover:bg-green-600'
          >
            Submit
          </button>
      }
    </form>
  )
}