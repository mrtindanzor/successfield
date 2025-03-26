import CourseCard from "../../../Components/CourseCard/CourseCard";
import styles from "./CoursesOverview.module.css";
import useCourses from "./../../../Contexts/CourseContext/CoursesContext";
import { useMemo } from "react";

export default function CoursesOverview(){
  const { coursesList } = useCourses()
  const Content = useMemo(() => {
    const c = {
                description: `Successfield College offers high-impact professional courses designed for ambitious leaders like you. From Executive Certificates to Doctorates, our programs equip you with the skills and credentials to thrive in today's fast-paced world. Explore our courses and take your career to the next level!`
              }
              return c
  }, [])

  return (
    <>
      <h2 className={ styles.description }> { Content.description } </h2>
      <div className={ styles.mainContent }>
      {
        coursesList.map((course, index) => <CourseCard title={ course.course } key={ index } />)
      }

      </div>
    </>
  )
}