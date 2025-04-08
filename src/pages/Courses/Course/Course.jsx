import styles from "./Courses.module.css";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useCourses from "./../../../Contexts/CourseContext/CoursesContext";
import CourseCard from "../../../Components/CourseCard/CourseCard";
import { formatUrl } from "../../../core";
import usePendingLoader from "../../../Hooks/Loader/PendingLoader/PendingLoader";


function SubListItem(props){
  const { list } = props
  const { content } = props

  return (
    list ? <ul className={ styles.subList }>
            {
              list.map(function(element, index){
                const key = Object.keys(element)[0]
                const id = Object.keys(element)[1]
                return <li key={ element[id] + index}> { element[key] } </li>
              })
            }
          </ul>
          : 
          <p className={ styles.listContent }>
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
          return <li key={ module.index }> <span className={ styles.moduleIndex }> { module.index } </span> { module.title } </li>
        })
      }
    </ul>
  )
}



export default function Course(){
  const [currentCourse, setCurrentCourse] = useState(null)
  const { setIsPendingLoader } = usePendingLoader()
  const { getCourse, coursesList } = useCourses()
  let { course } = useParams()
  course = formatUrl(course)
  const listContainerRef = useRef()


  function activeSubList(e = ''){
    const spans = listContainerRef.current.querySelectorAll('div > span')
    const subLists = spans[0].parentElement.nextElementSibling.querySelectorAll('ul')
    const contentLists = spans[0].parentElement.nextElementSibling.querySelectorAll('p')
    const contentList = [...subLists, ...contentLists]

    if(!e){
      contentList.forEach((list, index) => {
        if(index !== 0) list.style.display = 'none'
      })

      return
    }

    let i = ''
    spans.forEach((span, index) => {
      span.style.backgroundColor = 'var(--t-green)'
      if(span === e.target) {
        span.style.backgroundColor = 'var(--p-color)'
        i = index
      }  
    })

    contentList.forEach((list, index) => {
      list.style.display = 'none'
      if(index === i) list.style.display = 'flex'
    })
  }

  function ShowList({ currentCourse }){
    const list = [
      {
        title: 'Outlines',
        list: currentCourse.outlines
      },
      {
        title: 'Benefits',
        list: currentCourse.benefits
      },
      {
        title: 'Objectives',
        list: currentCourse.objectives
      },
      {
        title: 'Modules',
        modules: currentCourse.modules
      },
      {
        title: 'Certificate',
        content: currentCourse.certificate
      }
  ]
  
    return (
      <>
        <div className={ styles.listButtons }>
          { 
            list.map(( currentList, index) => {
              return <span key={ currentList.title + index } onClick={ (e) => activeSubList(e) } > { currentList.title } </span>
            }) 
          }
        </div>
        <div>
          {
            list.map(( currentList, i) => {
              if(currentList.list){
                const mkey = Object.values(currentList.list[i])[0]
                return <SubListItem key={ mkey } list={ currentList.list } />
              } 
              else if(currentList.modules){
                return (<ul className={ styles.subList }>
                    {
                      currentList.modules.map( (module, j) => {
                        return <li key={ module.title + j } className={ styles.moduleList }> <span className={ styles.moduleIndex }> { module.index } </span> { module.title } </li>
                      })
                    }
                  </ul>)
              }
                else {
                  return <SubListItem key={ currentList.title } content={ currentList.content } />
                }
            })
          }
        </div>
      </>
    )
  }

  useEffect(() => {
    const searhCourse = getCourse(course)
    setCurrentCourse(searhCourse)
  },[course, coursesList])

  useEffect(() => {
    currentCourse && activeSubList('')
  }, [currentCourse])

  return (
    <>
      { !currentCourse && setIsPendingLoader(true) }
      { currentCourse && setIsPendingLoader(false) }
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
        { currentCourse && <ShowList currentCourse={ currentCourse } /> }
      </div>

    </>
  )
}