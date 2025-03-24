import { createContext, useContext } from "react"
import useCourse from "../../Hooks/useCourses/useCourses"

const CoursesContext = createContext()

export function CoursesProvider({ children }){
  const { coursesList, getCourse, getModule } = useCourse()

  return (
    <CoursesContext.Provider value={ { coursesList, getCourse, getModule } }>
      { children }
    </CoursesContext.Provider>
  )
}

export default function useCourses(){ return useContext(CoursesContext) }