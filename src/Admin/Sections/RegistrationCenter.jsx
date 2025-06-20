import { useState, useMemo, useCallback, useEffect } from 'react'
import axios from 'axios'
import { ChevronDown } from 'lucide-react'
import { useSetFeedback } from '../Home/AdminHome'
import { useSelector, useDispatch } from 'react-redux'
import {
  applicationsSelector,
  getApplications,
  approveApplication,
  removeApplication  
  } from '../../Slices/adminSlice'
import { coursesListSelector } from '../../Slices/coursesSlice'
import { setLoader, serverUriSelector } from '../../Slices/settingsSlice'
import { Loading } from '../../Components/Loader'

export function Applications(){
  const dispatch = useDispatch()
  const applications = useSelector( applicationsSelector ).applications
  const total = useSelector( applicationsSelector ).total
  const loading = useSelector( applicationsSelector ).loading

  useEffect(() => {
    dispatch( getApplications() )
  },[])

  if(loading) return <Loading />

  if(!loading && total < 1) {
    return <p
      className='text-gray-600 font-bold uppercase mx-auto w-fit'
      >
      No current applications
    </p>
  }

  return (
    <div
      className="grid 2xl:grid-cols-2 gap-y-5 gap-x-3">
      <h2
        className="text-green-800 font-bold text-2xl border-b-3 h-fit pb-3 flex col-span-full"> 
        Total applications: { total } 
      </h2>
      { applications.map( applicant => <ListStudentCard 
          key={ applicant._id } 
          { ...{ student: applicant, application: true } } /> ) }
    </div>   
  )
}

export function ListStudentCard({ student, application }){
  const [ active, setActive ] = useState(false)
  if(student.isVisible === false) return null
  return (
    <div 
      className="flex flex-col gap-y-5">
      <StudentList { ...{ setActive, active, student } } />
      { active && <StudentCard { ...{ student, application } } /> }
    </div>
  )
}

function StudentList({ student, active, setActive }){
  const name = useMemo(() => `
    ${ student.firstname } 
    ${ student.middlename ?? '' } 
    ${ student.surname } `, 
  [student])

  return(
    <label
      onClick={ () => setActive( a => !a ) }
      className="flex justify-between bg-gray-800 rounded py-3 px-5 text-white cursor-pointer hover:bg-gray-950">
        <h2
          className="tuffy-bold"> 
          { name } 
        </h2>
        <ChevronDown 
          className={`${ active ? 'rotate-[180deg]':'' } transition duration-200 ease-linear`}
        />
    </label>
  )
}

function StudentCard({ student, application }){

  return(
    <div
      className="grid gap-5 md:grid-cols-[auto_auto]">
      <StudentField { ...{ title: 'Hightest Level of education', value: student?.educationLevel || 'N/A' } } />
      <StudentField { ...{ title: 'Programme', value: student?.programme || 'N/A' } } />
      <StudentField { ...{ title: 'Student ID', value: student?.studentNumber || 'N/A' } } />
      <StudentField { ...{ title: 'Email', value: student?.email || 'N/A' } } />
      <StudentField { ...{ title: 'Phone', value: student?.phone || 'N/A' } } />
      <StudentField { ...{ title: 'Gender', value: student?.gender || 'N/A' } } />
      <StudentField { ...{ title: 'D.O.B', value: student?.birthDate || 'N/A' } } />
      <StudentField { ...{ title: 'Country', value: student?.address?.country || 'N/A' } } />
      <StudentField { ...{ title: 'State', value: student?.address?.state || 'N/A' } } />
      <StudentField { ...{ title: 'City', value: student?.address?.city || 'N/A' } } />
      <StudentField { ...{ title: 'Address 1', value: student?.address?.address1 || 'N/A' } } />
      <StudentField { ...{ title: 'Address 2', value: student?.address?.address2 || 'N/A' } } />
      { student?.userImage?.secure_url && <ImagePreview { ...{ title: 'Student photo', url: student?.userImage?.secure_url } } /> }
      { student?.nationalId?.secure_url && <ImagePreview { ...{ title: 'National ID', url: student?.nationalId?.secure_url } } /> }
      { application && <AcceptOrDeny { ...{ studentNumber: student?.studentNumber || 'N/A' } } /> }
    </div>
  )
}

function StudentField({ title, value }){
  
  return (
    <label
      className="relative border-2 border-gray-500 rounded-md px-3 py-3 col-span-full">
      <h3
        className="absolute top-0 translate-y-[-50%] text-sm left-2 bg-white text-green-500 px-2 py-1"> { title } </h3>
      <h4
        className='!select-all cursor-text'> { value } </h4>
    </label>
  )
}

function ImagePreview({ title, url }){
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

function AcceptOrDeny({ studentNumber }){
  const setFeedback = useSetFeedback()
  const dispatch = useDispatch()

  const handleOperation = useCallback( async operation => {
    try{
      dispatch( setLoader(true) )

      switch(operation){
        case 'approve':
          const data = await dispatch( approveApplication(studentNumber) ).unwrap()
          setFeedback({ success: true, message: data.message })
        break

        case 'decline':
          const data_1 = await dispatch( removeApplication(studentNumber) ).unwrap()
          setFeedback({ success: true, message: data_1.message })
        break
      }
    } catch(error){
      setFeedback({ error: true, message: error.message || 'Something went wrong' })
    } finally{
      dispatch( setLoader(false) )
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [studentNumber])

  return (
    <div
      className='flex w-fit ml-auto gap-3 col-span-full '>
      <button
        onClick={ () => handleOperation("approve") }
        className='text-white cursor-pointer text-sm font-semibold rounded-md bg-green-500 px-3 py-2 w-fit h-fit hover:opacity-80'>
      Accept Application </button>
      <button
        onClick={ () => handleOperation("decline") }
        className='text-white cursor-pointer text-sm font-semibold rounded-md bg-rose-600 px-3 py-2 w-fit h-fit hover:opacity-80'>
      Revoke Application</button>
    </div>
  )
}

export function CourseRegistration(){
  const dispatch = useDispatch()
  const setFeedback = useSetFeedback()
  const serverUri = useSelector( serverUriSelector )
  const uri = serverUri + '/users/courses/register'
  const coursesList = useSelector( coursesListSelector )
  const [ listVisible, setListVisible ] = useState(false)
  const [ currentOperation, setCurrentOperation ] = useState({ studentNumber: '', programme: '' })

  async function handleOperation(e){
    e.preventDefault()

    try {
      dispatch( setLoader(true) )
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
      dispatch( setLoader(false) )
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