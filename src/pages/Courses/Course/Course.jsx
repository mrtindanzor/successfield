import styles from "./Course.module.css";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useCourses } from "./../../../Hooks/useCourses/useCourses";
import CourseCard from "../../../Components/CourseCard/CourseCard";

function SubListItem(props){
  const { list } = props
  const { content } = props

  return (
    list ? <ul className={ styles.subList }>
            {
              list.map(function(element, index){
                const key = Object.keys(element)[0]
                return <li key={ index }> { element[key] } </li>
              })
            }
          </ul>
          : 
          <p>
            { content }
          </p>
  )
}

export default function Course(){
  const [currentCourse, setCurrentCourse] = useState(null)
  const { getCourse, coursesList } = useCourses()
  let { course } = useParams()
  course = course.trim().toLocaleLowerCase().split('-').join(' ')
  const listContainerRef = useRef()


  function activeSubList(e = ''){
    const spans = listContainerRef.current.querySelectorAll('span')
    for (const span of spans){
      span.style.backgroundColor = 'var(--t-green)'
      const list = span.nextElementSibling
      list.style.display = 'none'
    }

    e.target.style.backgroundColor = 'var(--p-color)'
    e.target.nextElementSibling.style.display = 'flex'
  }

  useEffect(() => {
    const searhCourse = getCourse(course)
    setCurrentCourse(searhCourse)
  },[course, coursesList])

  return (
    <>
      { !currentCourse && <b>Loading...</b> }
      { currentCourse && <h1 className={ styles.courseHeading }> { currentCourse.course } </h1> }
      { currentCourse &&  <CourseCard title={ currentCourse.course } /> }
      { currentCourse && <div className={ styles.courseOverview }>
                            <SubListItem content={ currentCourse.overview } />
                          </div> }
                          
      <hr />

      { currentCourse && <div className={ styles.courseFee }>
                            <span> Fee: </span>
                            <SubListItem content={ currentCourse.fee } />
                          </div> }
      
      <hr />

      <div className={ styles.listContainer } ref={ listContainerRef }>
        { currentCourse && <div className={ styles.courseOutline } onClick={ (e) => activeSubList(e) } >
                              <span> Outlines </span>
                              <SubListItem list={ currentCourse.outlines } />
                            </div> }
        { currentCourse && <div className={ styles.courseObjective } onClick={ (e) => activeSubList(e) } >
                              <span> Objectives </span>
                              <SubListItem list={ currentCourse.objectives } />
                            </div> }
        { currentCourse && <div className={ styles.courseBenefit } onClick={ (e) => activeSubList(e) } >
                              <span> Benefits </span>
                              <SubListItem list={ currentCourse.benefits } />
                            </div> }
        { currentCourse && <div className={ styles.courseCertificate } onClick={ (e) => activeSubList(e) } >
                              <span> Certificate </span>
                              <SubListItem content={ currentCourse.certificate } />
                            </div> }
      </div>

    </>
  )
}