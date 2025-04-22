import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useCourses from "./../../../Contexts/CourseContext/CoursesContext";
import usePendingLoader from "./../../../Contexts/PendingLoaderContext/PendingLoaderContext";
import CourseCard from "../../../Components/CourseCard/CourseCard";
import { formatUrl } from "../../../core";
import { PendingLoading } from './../../../Hooks/Loader/PendingLoader/PendingLoader';


function SubListItem({ list, content, mapped, index, currentTabIndex }){
  let classes = `p-5 flex-col capitalize ${ currentTabIndex === index ? "flex" : "hidden" }`
  let contentClasses = `leading-relaxed capitalize ${ currentTabIndex === index ? "flex" : "hidden" }` 

  return (
    list ? <ul className={ classes } key={ Date.now() * Math.random() }>
            {
              list.map((element, index) => {
                return <li key={ element + index } className=" border-b-1 border-b-gray-300 py-2 "> { element } </li>
              })
            }
          </ul>
          : 
          <p className={ contentClasses }>
            { content }
          </p>
  )
}

function ModuleList({ list, currentTabIndex, index }){

  const newList = []
  for(const item in list){
    const obj = {
      _id: list[item]._id,
      index: list[item].index,
      title: list[item].title
    }
    const isInList = newList.find(alist => alist.title === list[item].title)
    if(!isInList) newList.push(obj)
  }

  const listClasses = `p-5 flex-col capitalize ${  currentTabIndex === index ? "flex" : "hidden" }`
  

  return (
    <ul className={ listClasses } key={ Date.now() * Math.random() }>
      {
        newList.map( module => {
          return <li key={ module._id } className=" py-2 leading-relaxed border-b-1 border-b-gray-300 "> <span className=" inline-flex items-center justify-center p-2 object-contain border-2 border-grey-400 rounded-[50%] w-10 h-10 "> { module.index } </span> { module.title } </li>
        })
      }
    </ul>
  )
}

export default function Course(){
  const [currentCourse, setCurrentCourse] = useState(null)
  const { getCourse, coursesList } = useCourses()
  const { setIsPendingLoading } = usePendingLoader()
  let { course } = useParams()
  course = formatUrl(course)
  const listContainerRef = useRef()

  useEffect(() => {
    setIsPendingLoading(true)
    if(coursesList.length > 0){
      const findCourse = getCourse(course, "course")
      const code = findCourse.courseCode
      const m = getCourse(code, 'modules')
      const b = getCourse(code, 'benefits')
      const outs = getCourse(code, 'outlines')
      const objs = getCourse(code, 'objectives')
      setCurrentCourse({
        ...findCourse,
        benefits: b,
        outlines: outs,
        objectives: objs,
        modules: m
      })
      setIsPendingLoading(false)
    }
  },[course, coursesList])

  return (
    <>
      {
        currentCourse && currentCourse.benefits ? <>
          { currentCourse && <h1 className=" texturina text-3xl text-green-800 text-center px-10 py-20 uppercase "> { currentCourse.course } </h1> }

          { currentCourse &&  <CourseCard title={ currentCourse.course } /> }

          { currentCourse && <div className=" px-5 py-10 leading-relaxed ">
                                <SubListItem content={ currentCourse.overview } />
                              </div> }
                              
          <hr />

          { currentCourse && <div className=" grid gap-3 px-7 py-1 ">
                                <span className=" font-semibold "> Fee: </span>
                                <SubListItem content={ currentCourse.fee } />
                              </div> }
          
            { currentCourse && 
              currentCourse.modules?.length > 0 ? 
              <Link to={ 'module' } 
              className=" px-6 py-2 rounded-tl-md rounded top-tr-md bg-green-600 hover:bg-green-700 text-white ml-3 mt-8 block w-fit "> Start Course </Link> : null }

          <hr />

          <div className=" block course-list-container">
            { currentCourse && <ShowList { ...{ currentCourse, outlines: currentCourse.outlines, objectives: currentCourse.objectives, modules: currentCourse.modules, benefits: currentCourse.benefits } } /> }
          </div>
        </> : <PendingLoading />
      }
    </>
  )
}

function ShowList({ currentCourse, outlines, objectives, modules, benefits }){
  const [ currentTabIndex, setCurrentTabIndex ] = useState(0)
  const list = [
                { title: 'Outlines', list: outlines },
                { title: 'Benefits', list: benefits },
                { title: 'Objectives', list: objectives },
                { title: 'Modules', modules: modules },
                { title: 'Certificate', content: currentCourse.certificate }
              ]

  return (
    <>
      <div className=" grid grid-cols-2 md:grid-cols-5 w-fit gap-1 mx-10 ">
        { 
          list.map(( currentList, index) => {
            let classes = `rounded p-2 ${ index === currentTabIndex ? "bg-green-500" : "bg-green-200" }`
            return <span className={ classes } key={ currentList.title } onClick={ () => setCurrentTabIndex(index) } > { currentList.title } </span>
          }) 
        }
      </div>
      <div>
        {
          list.map(( nestedList, listIndex) => {
            if(nestedList.list){
              return <SubListItem { ...{ currentTabIndex, index: listIndex, list: nestedList.list, mapped: true } } />
            } 

            if(nestedList.modules){
              return <ModuleList { ...{ list: nestedList.modules, index: listIndex, currentTabIndex } } />
            }
            else {
              return (
                <div className=" pt-6 px-5 ">
                  <SubListItem  { ...{ mapped: true, currentTabIndex, index: listIndex, content: nestedList.content } } />
                </div>
              )
            }
          })
        }
      </div>
    </>
  )
}