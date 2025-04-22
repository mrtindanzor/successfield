import { useEffect , useMemo, useState } from "react"
import useAuth from "../../Contexts/AuthenticationContext/AuthenticationContext"
import { useSetAlert } from "../../Hooks/Alerter/Alerter"
import { PendingLoading } from "../../Hooks/Loader/PendingLoader/PendingLoader"
import { useNavigate, useParams } from "react-router-dom"
import { formatUrl } from "../../core"
import useCourses from "../../Contexts/CourseContext/CoursesContext"

export default function OnlyAuthorizedForModule({ children }) {
  let { course } = useParams()
  const { getCourse, coursesList } = useCourses()
  let courseCode = useMemo(() => {
    let c 
    if(coursesList){
      c = formatUrl(course)
      const code = getCourse(c, 'course')
      console.log(code)
      c = code.courseCode
    }
    return c
  }, [course, coursesList])
  const { checkIfStudentIsAuthorizedForCourse } = useAuth()
  const [ authorized, setAuthorized ] = useState(null)
  const setMsg = useSetAlert()
  const navigate = useNavigate()

  useEffect(() => {
    if(courseCode){
      checkIfStudentIsAuthorizedForCourse()
        .then( res => {
          if(res.status === 401){
            setMsg(res.msg || 'Error authorizing you try again later')
            navigate('/users/studentsJ')
          }
          if(res.status === 200) setAuthorized(res)
        } )
    }
  }, [courseCode])

  return <></>
  
  if(authorized && authorized.status === 200) return <> { children } </>

  return (
     <PendingLoading />
  )
}
