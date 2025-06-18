import { useEffect , useMemo, useState, useCallback } from "react"
import useAuth from "../../Contexts/AuthenticationContext"
import { useSetAlert } from "../../Hooks/Alerter"
import { PendingLoading } from "../../Hooks/PendingLoader"
import { useNavigate, useParams } from "react-router-dom"
import { formatUrl } from "../../core"
import useCourses from "../../Contexts/CoursesContext"

export default function OnlyAuthorizedForModule({ children }) {
  let { course } = useParams()
  const { getCourse, coursesList } = useCourses()  
  const [ authorized, setAuthorized ] = useState(null)
  const setMsg = useSetAlert()
  const navigate = useNavigate()
  let courseCode = useMemo(() => {
    let c 
    if(coursesList.length > 0) c = getCourse(formatUrl(course), 'course').courseCode.toLowerCase()
    return c
  }, [course, coursesList])
  const getCoursesOfStudent = useCallback( async () => {
    if(courseCode){
      if(currentUser.courses?.includes(courseCode)) setAuthorized({ status: 200 })

      if(!currentUser.courses?.includes(courseCode)){
        const res = await checkIfStudentIsAuthorizedForCourse(courseCode)
        switch (res.status) {
          case 200:
            setAuthorized(res)
            setCurrentUser( user => ({
              ...user,
              courses: Array.from(new Set([ ...(user.courses || []), courseCode]))
            }))
          break;
        
          default:
            setMsg(res.msg || 'Error authorizing you try again later')
            navigate('/users/students-area')
        }
      }
    }
  }, [courseCode])
  const { checkIfStudentIsAuthorizedForCourse, currentUser, setCurrentUser } = useAuth()

  useEffect(() => {
    getCoursesOfStudent()
  }, [courseCode])
  
  if(authorized && authorized.status === 200) return <> { children } </>

  return (
     <PendingLoading />
  )
}
