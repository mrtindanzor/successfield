import { useEffect, useState } from 'react'
import useGetStudents from './../Hooks/GetStudents'

export default function Students(){
  const init = useGetStudents()
  const [ initCount, setInitCount ] = useState(false)
  const [ students, setStudents ] = useState()
  const [ searchKeyword, setSearchKeyword ] = useState('')

  useEffect(() => {
    setInitCount(false)
  }, [])

  useEffect(() => {
    if(init && init.length > 0 && !initCount){
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
      setInitCount(true)
    }
  }, [init, initCount])

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

  if(!initCount) return (
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
        className='bg-gray-300 rounded grid gap-3 px-2 py-2 mb-5'
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
      { initCount && students.map( terms => {
      return <div
        key={ terms._id }
        className='grid gap-6 px-2 py-5 bg-gray-100'
        >
        <h2
          className='uppercase font-bold text-xl texturina'
          > Term: { terms.term } </h2>
        <h3
          className='font-semibold text-lg uppercase'
          > Total students for year: { terms.students.length } </h3>
        <li
        className='grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-5'
        >
        {
          terms.students.map( student => {
            if(!student.visible) return
            return (
              <div
                key={ student._id }
                className='grid gap-3 px-3 py-5 border-1 border-gray-200 rounded bg-gray-200'
                >
                <span> Name: { student.name } </span>
                <span> Student ID: { student.studentNumber } </span>
                <span> Email: { student.email } </span>
                <span> Date: { student.date } </span>
              </div>
            )
          } )
        }
      </li>
      </div>
    } ) }
    </ul>
  )
}