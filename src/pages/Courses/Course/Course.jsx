import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useCourses from "./../../../Contexts/CourseContext/CoursesContext";
import CourseCard from "../../../Components/CourseCard/CourseCard";
import { formatUrl } from "../../../core";
import { PendingLoading } from './../../../Hooks/Loader/PendingLoader/PendingLoader';


function SubListItem({ list, content, mapped }){
  
  let classes = "p-5 flex-col "
  let contentClasses = "leading-relaxed"
  if(mapped) classes += " hidden"
  if(mapped) contentClasses +=" hidden"

  return (
    list ? <ul className={ classes }>
            {
              list.map(function(element, index){
                const key = Object.keys(element)[0]
                const id = Object.keys(element)[1]
                return <li key={ element[id] + index} className=" border-b-1 border-b-gray-300 py-2 "> { element[key] } </li>
              })
            }
          </ul>
          : 
          <p className={ contentClasses }>
            { content }
          </p>
  )
}

function ModuleList({ list }){

  list.sort((x, y) => x.index - y.index)

  return (
    <ul className=" p-5 flex-col hidden ">
      {
        list.map(function( module ){
          return <li key={ module.index } className=" py-2 leading-relaxed border-b-1 border-b-gray-300 "> <span className=" inline-flex items-center justify-center p-2 object-contain border-2 border-grey-400 rounded-[50%] w-10 h-10 "> { module.index } </span> { module.title } </li>
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
    const subLists = spans[0].parentElement.nextElementSibling.querySelectorAll('ul')
    const contentLists = spans[0].parentElement.nextElementSibling.querySelectorAll('p')
    const contentList = [...subLists, ...contentLists]

    if(!e){
      contentList.forEach((list, index) => {
        if(index !== 0) list.classList.add('hidden')
        if(index === 0) list.classList.remove('hidden')
      })

      spans.forEach((span, index) => {
        if(index !== 0) span.classList.remove('bg-green-500')
        if(index !== 0) span.classList.add('bg-green-200')
        if(index === 0) span.classList.add('bg-green-500')
        if(index === 0) span.classList.remove('bg-green-200')
      })
  

      return
    }

    let i = ''
    spans.forEach((span, index) => {
      span.classList.remove('bg-green-500')
      span.classList.add('bg-green-200')
      if(span === e.target) {
        span.classList.add('bg-green-500')
        i = index
      }  
    })

    contentList.forEach((list, index) => {
      if(index !== i) list.classList.add('hidden')
      if(index === i) list.classList.remove('hidden')
      if(index === i) list.classList.add('flex')
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
        <div className=" grid grid-cols-2 md:grid-cols-5 w-fit gap-1 mx-10 ">
          { 
            list.map(( currentList, index) => {
              let classes = " bg-green-200 p-2  "
              if( index === 0 ) classes = " bg-green-500 p-2  "
              return <span className={ classes } key={ currentList.title + index } onClick={ (e) => activeSubList(e) } > { currentList.title } </span>
            }) 
          }
        </div>
        <div>
          {
            list.map(( currentList, i) => {
              if(currentList.list){
                const mkey = Object.values(currentList.list[i])[0]
                return <SubListItem key={ mkey } list={ currentList.list } mapped />
              } 
              else if(currentList.modules){
                return <ModuleList list={ currentList.modules } />
              }
                else {
                  return (
                    <div className=" pt-6 px-5 ">
                      <SubListItem key={ currentList.title } mapped content={ currentList.content } />
                    </div>
                  )
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
      { !currentCourse && <PendingLoading /> }
      { currentCourse && <h1 className=" texturina text-3xl text-green-800 text-center px-10 py-20 uppercase "> { currentCourse.course } </h1> }
      { currentCourse &&  <CourseCard title={ currentCourse.course } /> }
      { currentCourse && <div className=" px-5 py-10  ">
                            <SubListItem content={ currentCourse.overview } />
                          </div> }
                          
      <hr />

      { currentCourse && <div className=" grid gap-3 px-7 py-1 ">
                            <span className=" font-semibold "> Fee: </span>
                            <SubListItem content={ currentCourse.fee } />
                          </div> }
      
        { currentCourse && currentCourse.modules.length > 0 ? <Link to={ '' + currentCourse.modules.sort((x, y) => x.index - y.index)[0].index } className=" px-6 py-2 rounded-tl-md rounded top-tr-md bg-green-600 hover:bg-green-700 text-white ml-3 mt-8 block w-fit "> Start Course </Link> : null }
      <hr />

      <div className=" block " ref={ listContainerRef }>
        { currentCourse && <ShowList currentCourse={ currentCourse } /> }
      </div>
    </>
  )
}