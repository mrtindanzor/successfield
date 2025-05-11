import { useEffect, useState } from 'react'
import useGetStudents from './../Hooks/GetStudents'

export default function Students(){
  const init = useGetStudents()
  const [ initCount, setInitCount ] = useState(false)
  const [ students, setStudents ] = useState([])

  useEffect(() => {
    if(init?.length > 0 && !initCount){
      setStudents(init)
      setInitCount(true)
    }
  }, [init])


  if(students && students.length < 1){
    return <p> No students registered </p>
  }

  return (
    <ul>
      { setInitCount && students.map( terms => {
      return <div
        className='grid gap-6 p-5 bg-gray-100'
        >
        <h2
          className='uppercase font-bold text-xl texturina'
          > Term: { terms.term } </h2>
        <h3
          className='font-semibold text-lg uppercase'
          > Total students for year: { terms.students.length } </h3>
        <li
        className='grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-5 px-4'
        >
        {
          terms.students.map( student => {
            return (
              <div
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