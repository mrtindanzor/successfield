import { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  studentsSelector,
  getStudents
} from '../../Slices/adminSlice'
import { Loading } from '../../Components/Loader'
import { ListStudentCard } from './RegistrationCenter'

export default function Students(){
  const dispatch = useDispatch()
  const [ filtering, setFiltering ] = useState(false)
  const students = useSelector( studentsSelector ).students
  const [ studentsSearch, setStudentsSearch ] = useState([])
  const total = useSelector( studentsSelector ).total
  const loading = useSelector( studentsSelector ).loading

  const search = useCallback( _keyword => {
    !filtering && setFiltering(true)
 
    setStudentsSearch(() => {
      if(!_keyword){
        setFiltering(false)
        return students.map( _s => ({ ..._s, isVisible: true }) )
      } 
      const keyword = _keyword.split(' ').join('-').trim()
      return students
        .map( _s => {
          const number = _s.studentNumber.toLowerCase().trim()
          const email = _s.email.toLowerCase().trim()
          const name = (`${ _s.firstname } ${ _s.middlename || '' } ${ _s.surname }`).split(' ').join('-').toLowerCase().trim()
          
          if(number.includes(keyword) || name.includes(keyword) || email.includes(keyword)) return ({ ..._s, isVisible: true })
          return ({ ..._s, isVisible: false })
        } )
    })
  }, [students])

  useEffect(() => {
    dispatch( getStudents() )
  }, [])

  if(loading) return <Loading />

  if(!loading && total < 1){
    return (
      <p
        className="texturina w-fit mx-auto text-2xl mt-[10%]"> 
        No students registered 
      </p>
    )
    
  }
  
  return (
    <ul
      className="grid grid-cols-[auto_1fr]">
      <h2
       className="px-5 col-span-full md:col-span-1 flex flex-col h-full items-center py-3 tuffy-bold text-xl">
        Total Students: 
        <span> { total } </span>
      </h2>
      <label 
        className='bg-gray-300 col-span-full md:col-span-1 rounded grid gap-3 p-3 mb-5'>
        <span
          className='font-semibold text-lg'> 
          Find Student:
        </span>
        <input 
          placeholder='email or name or id'
          className='block px-3 py-3 bg-gray-100 w-full'
          onChange={ e => search( e.target.value ) }
          />
      </label>
      <div
        className="grid 2xl:grid-cols-2 gap-y-5 gap-x-3 col-span-full">
        { !filtering && students.map( student => <ListStudentCard key={student._id} { ...{ student } } /> ) }
        { filtering && studentsSearch?.map( student => <ListStudentCard key={student._id} { ...{ student } } /> ) }
      </div>
    </ul>
  )
}