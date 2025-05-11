import useServerUri from './../../Contexts/baseServer.jsx'
import { useEffect, useState } from 'react'

export default function useGetUsers(){
  const [ students, setStudents ] = useState([])
  const uri = useServerUri() + 'users/students'

  useEffect(() => {
    getStudents()
  }, [])

  async function getStudents(){
    try{
      const method = 'POST'
      const response = await fetch(uri, { method })
      if(!response.ok) return setStudents([])
      const res = await response.json()
      setStudents(res)
    } catch(err){
      setStudents([])
    }
  }

  return students
}