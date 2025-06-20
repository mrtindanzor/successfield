import { useEffect , useMemo, useState, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { formatUrl } from "../../core"
import { 
  coursesListSelector,
  getCourse
 } from '../../Slices/coursesSlice'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector } from '../../Slices/userSlice'
import { setAlertMessage } from '../../Slices/settingsSlice'
import { Loading } from '../Loader'

export default function OnlyAuthorizedForModule({ children }) {
  const { user, courses } = useSelector( userSelector )
  let { course } = useParams()
  const coursesList = useSelector( coursesListSelector )  
  const [ authorized, setAuthorized ] = useState(null)
  const navigate = useNavigate()
  
  const checkAuthorization = useCallback( async () => {
    if(!coursesList || !courses) return
    const _c = formatUrl(course).toLowerCase()
    const find = coursesList.find( course => course.course === _c )
    if(!find){
      setAlertMessage((res.msg || 'Error authorizing you try again later'))
      return navigate('/', { replace: true })
    } 
    setAuthorized(true)
  }, [coursesList, courses, courses])

  useEffect(() => {
    checkAuthorization()
  }, [coursesList, courses, courses])
  
  if(authorized) return children

  return (
     <Loading />
  )
}
