import styles from "./Course.module.css";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCourses } from "./../../../Hooks/useCourses/useCourses";
import CourseCard from "../../../Components/CourseCard/CourseCard";
import { formatUrl } from "../../../core";


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

function ModuleList({ list }){

  list.sort((x, y) => x.index - y.index)

  return (
    <ul className={ styles.subList }>
      {
        list.map(function( module, i){
          return <li key={ i }> <span className={ styles.moduleIndex }> { module.index } </span> { module.title } </li>
        })
      }
    </ul>
  )
}

export default function Course(){
  const [currentCourse, setCurrentCourse] = useState(null)
  const { getCourse, coursesList } = useCourses()
  let { course } = useParams()
  course = formatUrl(course)
  const listContainerRef = useRef()


  function activeSubList(e = ''){
    const spans = listContainerRef.current.querySelectorAll('div > span')
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
      
        { currentCourse && currentCourse.modules.length > 0 ? <Link to={ '' + currentCourse.modules.sort((x, y) => x.index - y.index)[0].index } className={ styles.startCourse }> Start Course </Link> : null }
      <hr />

      <div className={ styles.listContainer } ref={ listContainerRef }>
        { currentCourse && <div className={ styles.courseOutline } >
                              <span  onClick={ (e) => activeSubList(e) }> Outlines </span>
                              <SubListItem list={ currentCourse.outlines } />
                            </div> }
        { currentCourse && <div className={ styles.courseObjective } >
                              <span  onClick={ (e) => activeSubList(e) }> Objectives </span>
                              <SubListItem list={ currentCourse.objectives } />
                            </div> }
        { currentCourse && <div className={ styles.courseBenefit } >
                              <span  onClick={ (e) => activeSubList(e) }> Benefits </span>
                              <SubListItem list={ currentCourse.benefits } />
                            </div> }
        { currentCourse && <div className={ styles.courseCertificate } >
                              <span  onClick={ (e) => activeSubList(e) }> Certificate </span>
                              <SubListItem content={ currentCourse.certificate } />
                            </div> }
        { currentCourse && <div className={ styles.courseModule } >
                              <span  onClick={ (e) => activeSubList(e) }> Modules </span>
                              <ModuleList list={ currentCourse.modules } />
                            </div> }
      </div>

    </>
  )
}