import CourseCard from "../../../Components/CourseCard/CourseCard";
import styles from "./CoursesOverview.module.css";
import useCourses from "./../../../Contexts/CourseContext/CoursesContext";

export default function CoursesOverview(){
  const { coursesList } = useCourses()

  return (
    <>
      {/* <h2>Choose a course to start now</h2> */}
      <div className={ styles.mainContent }>
      {
        coursesList.map((course, index) => <CourseCard title={ course.course } key={ index } />)
      }

      </div>
    </>
  )
}