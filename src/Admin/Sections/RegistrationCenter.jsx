import { useState, useMemo, useCallback, useEffect, useReducer, createContext, useContext } from 'react'
import useCourses from './../../Contexts/CoursesContext'
import useGetApplications from '../Hooks/GetApplications'
import useServerUri from '../../Contexts/baseServer'
import usePendingLoader from "../../Contexts/PendingLoaderContext"
import { useSetAlert } from "../../Hooks/Alerter"
import axios from 'axios'
import { ChevronDown } from 'lucide-react'
import { useSetFeedback } from '../Home/AdminHome'

const ApplicationsContext = createContext()

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

    case ACTIONS.SET_DEFAULT:
      return action.state
  
    default:
      return state
  }
}

export function Applications(){
  const [ applicationsCount, setApplicationsCount ] = useState(0)
  const initialedState = useGetApplications()
  const [ intializing, setIntializing ] = useState(true)
  const [ allApplications, applicationsDispatch ] = useReducer(applicationsReducer, initialedState)

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
    <ApplicationsContext.Provider value={ applicationsDispatch }>
        <div>
        { applicationsCount > 0 && <h2
      className="text-green-800 font-bold text-2xl border-b-3 h-fit
      pb-3 flex"
      > Total applications: { applicationsCount } </h2> }
        {
          applicationsCount > 0 && allApplications.map( application => {
            const { students } = application
            if(students.length > 0){
              return (
                <div key={ application.term } >
                  <h2
                    className='font-bold text-2xl mb-5 text-center texturina'>
                    Year: { application.term } 
                  </h2>
      
                  <ul
                    className='grid gap-5'>
                    { students.map( applicant => <TermApplicationsList key={applicant._id} { ...{ applicant, year: application.term } } /> ) }
                  </ul>
                </div>
              )
            }
          } )
        }
      </div>
    </ApplicationsContext.Provider>
   
  )
}

export function CourseRegistration(){
  const setFeedback = useSetFeedback()
  const { setIsPendingLoading } = usePendingLoader()
  const uri = useServerUri() + 'users/courses/register'
  const { coursesList } = useCourses()
  const [ listVisible, setListVisible ] = useState(false)
  const [ currentOperation, setCurrentOperation ] = useState({ studentNumber: '', programme: '' })

  async function handleOperation(e){
    e.preventDefault()

    try {
      setIsPendingLoading(true)
      const res = await axios.post(uri, { ...currentOperation })
      switch(res.data.status){
        case 201:
          setFeedback({ success: true, message: res.data.msg })
          setCurrentOperation( prev => ({ ...prev, programme: '' }) )
        break
        
        default:
          setFeedback({ error: true, message: res.data.msg })
      }
    } catch (err) {
      setFeedback({ error: true, message: err.message || 'Something went wrong' })
    } finally {
      setIsPendingLoading(false)
    }
  }

  return (
    <form onSubmit={ handleOperation }
      className='grid gap-3 p-3 h-fit'
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
          className='bg-gray-800 text-white px-2 py-3 cursor-pointer rounded'
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

function TermApplicationsList({ applicant, year }){
  const [ opened, setOpened ] = useState(false)

  return (
    <div
      className='flex flex-col gap-5'>
      <li
        onClick={() => setOpened(o => !o)}
        className='p-3 border-2 border-gray-200 rounded flex items-center justify-between cursor-pointer hover:bg-gray-300 bg-gray-200'>
        <h3>
          <span className='uppercase font-semibold text-md text-gray-800'> Name: </span>
          <span className='capitalize text-md text-gray-800'> { applicant.name } </span>
        </h3>
        <ChevronDown
          className={`${ opened ? 'rotate-[180deg]':'' } transition duration-300 ease-out`}
        />
      </li>
      { opened && <StudentCard { ...{ applicant, year } } /> }
    </div>
  )
}

export function StudentCard({ applicant, year }){
  const uri = useServerUri() + 'users/student'
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(null)
  const [ student, setStudent ] = useState(null)
  const getStudent = useCallback( async id => {
    const res = await axios.post(uri,{ studentNumber: id })
    // if(res.status > 200 && res.status < 200) throw Error(res.data.msg || 'Error fetching student')
    return res.data.student
  }, [ applicant ])

  useEffect(() => {
    if(applicant){
       try {
      getStudent(applicant.studentNumber)
        .then( student => {
          setStudent(student)
          setLoading(false)
        } )
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
    }
  }, [applicant])

  if(loading) return <span>loading...</span>
  if(error) return <span> { error } </span>
  if(!student) return null

  return(
    <div
      className="grid gap-5 md:grid-cols-[auto_auto]">
      { student.educationLevel && <StudentField { ...{ title: 'Hightest Level of education', value: student.educationLevel } } /> }
      <StudentField { ...{ title: 'Student ID', value: student.studentNumber } } />
      <StudentField { ...{ title: 'Email', value: student.email } } />
      { student?.phone && <StudentField { ...{ title: 'Phone', value: student.phone } } /> }
      { student?.gender && <StudentField { ...{ title: 'Gender', value: student.gender } } /> }
      { student?.birthDate && <StudentField { ...{ title: 'D.O.B', value: student.birthDate } } /> }
      { student?.address?.country && <StudentField { ...{ title: 'Country', value: student.address?.country } } /> }
      { student?.address?.state && <StudentField { ...{ title: 'State', value: student.address?.state } } /> }
      { student?.address?.city && <StudentField { ...{ title: 'City', value: student.address?.city } } /> }
      { student?.address?.address1 && <StudentField { ...{ title: 'Address 1', value: student.address?.address1 } } /> }
      { student?.address?.address2 && <StudentField { ...{ title: 'Address 2', value: student.address.address2 } } /> }
      { student?.userImage && <ImagePreview { ...{ title: 'Student photo', url: student.userImage?.secure_url } } /> }
      { student?.nationalId && <ImagePreview { ...{ title: 'National ID', url: student.nationalId?.secure_url } } /> }
      { year && <AcceptOrDeny { ...{ studentNumber: student.studentNumber, year } } /> }
    </div>
  )
}

export function StudentField({ title, value }){
  
  return (
    <label
      className="relative border-2 border-gray-500 rounded-md px-3 py-3 col-span-full">
      <h3
        className="absolute top-0 translate-y-[-50%] text-sm left-2 bg-white text-green-500 px-2 py-1"> { title } </h3>
      <h4
        className=''> { value } </h4>
    </label>
  )
}

export function ImagePreview({ title, url }){
  const [ loaded, setLoaded ] = useState(false)

  return (
    <label
      className="grid gap-2 max-w-fit">
      <h3
        className="text-green-500 font-semibold text-sm">
      { title } </h3>
      <div
        className='h-80 max-h-fit w-[min(80%,_20rem)] max-w-fit overflow-hidden drop-shadow-md drop-shadow-black rounded-md'>
        <img
          src={ url }
          onLoad={ () => setLoaded(true) }
          className={`${ loaded ? '':'blur-md' } transition duration-300 ease-linear w-full h-auto`}
        />
      </div>
    </label>
  )
}

function AcceptOrDeny({ studentNumber, year }){
    const setFeedback = useSetFeedback()
    const dispatch = useApplicationsDispatch()
    const { setIsPendingLoading } = usePendingLoader()
    const uri = useServerUri() + 'users/applications/edit'
    const applicationOperation = useCallback( async operation => {
      try {
        setIsPendingLoading(true)
        const _res = await axios.post( uri, { studentNumber, year, operation } )
        setFeedback({ success: _res.data.status === 200, error: _res.data.status !== 200, message: _res.data.msg  })
        dispatch({ type: ACTIONS.EDITTED, studentNumber, year, operation })
      } catch (error) {
         setFeedback({ error: true, message: error.message || 'Something went wrong'  })
      } finally {
        setIsPendingLoading(false)
      }
  }, [studentNumber])

  return (
    <div
      className='flex w-fit ml-auto gap-3 col-span-full '>
      <button
        onClick={ () => applicationOperation('approve') }
        className='text-white cursor-pointer text-sm font-semibold rounded-md bg-green-500 px-3 py-2 w-fit h-fit hover:opacity-80'>
      Accept Application </button>
      <button
        onClick={ () => applicationOperation('decline') }
        className='text-white cursor-pointer text-sm font-semibold rounded-md bg-rose-600 px-3 py-2 w-fit h-fit hover:opacity-80'>
      Revoke Application</button>
    </div>
  )
}

function useApplicationsDispatch(){ return useContext( ApplicationsContext ) }


