import { useEffect, useState } from 'react'
import { ImagePreview, StudentField, StudentCard } from './RegistrationCenter'
import useGetStudents from './../Hooks/GetStudents'

export default function Students(){
  const init = useGetStudents()
  const [ students, setStudents ] = useState()
  const [ searchKeyword, setSearchKeyword ] = useState('')

  useEffect(() => {
    if(init && init.length > 0){
      setStudents(() => {
        return init.map( c => {
          return {
            ...c, 
            students: c.students.map( student => {
              return {
                ...student,
                visible: true
              }
            })
          }
        } )
      })
    }
  }, [init])

  useEffect(() => {
    function trimToLower(word){ return word.trim().toLowerCase() }
    if(searchKeyword){
      setStudents( prev => prev.map( terms => {
        return {
          ...terms,
          students: terms.students.map( student => {
            return {
              ...student,
              visible: trimToLower(student.studentNumber).includes(trimToLower(searchKeyword)) || trimToLower(student.email).includes(trimToLower(searchKeyword)) || trimToLower(student.name).includes(trimToLower(searchKeyword))
            }
          } )
        }
    } ))
    }
  }, [searchKeyword])

  if(!init) return (
    <span
      className="texturina text-2xl mx-auto mt-[10%] "
      >
        loading...
    </span>
  )

  if(students && students.length < 1){
    return (
      <p
        className="texturina w-fit mx-auto text-2xl mt-[10%]"
        > No students registered 
      </p>
    )
    
  }
  
  return (
    <ul>
      <label 
        className='bg-gray-300 rounded grid gap-3 px-2 py-2 mb-5 max-w-[500px]'
        >
        <span
          className='font-semibold text-lg'
          > Find Student: </span>
        <input 
          placeholder='email or name or id'
          className='px-3 py-1 bg-gray-200 w-full'
          onChange={ e => setSearchKeyword( e.target.value ) }
          />
      </label>
      { students && students.map( terms => {
      return <div
        key={ terms._id }
        className='grid gap-6 px-2 py-5'
        >
        <h2
          className='uppercase font-bold text-xl texturina'
          > Term: { terms.term } </h2>
        <h3
          className='font-semibold text-lg uppercase'
          > Total students for year: { terms.students.length } </h3>
        <li>
          <ul
            className='grid'>
            { terms.students.map( student => {
            if(!student.visible) return
            return <Student key={student._id} { ...{ student } } />
          } ) }
          </ul>
      </li>
      </div>
    } ) }
    </ul>
  )
}

function Student({ student }){
  const [ active, setActive ] = useState(false)

  return (
    <li
      className="break-inside-avoid bg-gray-300 px-3 py-4 rounded-md overflow-hidden grid gap-5 grid-rows-[auto_1fr] mb-5">
      <div
        onClick={() => setActive(a => !a)}
        className="flex gap-2 cursor-pointer">
        <h3> Name: </h3>
        <h4>
          { student.name }
        </h4>
      </div>
      <div
        onClick={() => setActive(a => !a)}
        className="flex gap-2 uppercase">
        <h3> Student ID: </h3>
        <h4>
          { student.studentNumber }
        </h4>
      </div>
      
        { active && <div
            className='bg-white p-5 rounded-sm'>
              <StudentCard { ...{ applicant: student } } />
            </div> }
    </li>
  )
}