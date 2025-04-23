import CourseCard from "../../../Components/CourseCard";
import styles from "./CoursesOverview.module.css";
import useCourses from "./../../../Contexts/CoursesContext";
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
      <p className={ styles.description }> { Content.description } </p>
      <div className={ styles.mainContent } aria-label="All courses">
      {
        coursesList.map((course, index) => <CourseCard title={ course.course } key={ index } overview={ true } />)
      }

      </div>
    </>
  )
}