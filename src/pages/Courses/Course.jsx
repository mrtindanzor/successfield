import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useCourses from "../../Contexts/CoursesContext";
import usePendingLoader from "../../Contexts/PendingLoaderContext";
import CourseCard from "../../Components/CourseCard";
import { formatUrl } from "../../core";
import { PendingLoading } from '../../Hooks/PendingLoader';


function SubListItem({ list, content, mapped, index, currentTabIndex }){
  let contentClasses = `leading-relaxed capitalize ${ currentTabIndex === index ? "flex" : "hidden" }` 

  return (
    list ? <ul className={ `flex-col py-5 capitalize ${ currentTabIndex === index ? "flex" : "hidden" }` } key={ Date.now() * Math.random() }>
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

  const listClasses = `py-5 flex-col capitalize ${  currentTabIndex === index ? "flex" : "hidden" }`
  

  return (
    <ul className={ listClasses } key={ Date.now() * Math.random() }>
      {
        newList.map( module => {
          return <li key={ module._id } className=" py-2 leading-relaxed border-b-1 border-b-gray-300 "> { module.title } </li>
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
      const findCourse = getCourse(course)
      setCurrentCourse({
        ...findCourse
      })
      setIsPendingLoading(false)
    }
  },[course, coursesList])

  return (
    <section
      className="px-5 sm:px-8 md:px-10 lg:max-w-[1440px] mx-auto pb-100"
      >
      {
        currentCourse && currentCourse.benefits ? <>

          { currentCourse &&  <h2
              className="text-2xl sm:text-3xl pt-10 text-center text-black font-extrabold uppercase"
              >
                { currentCourse.course }
            </h2> }

          { currentCourse && <div className="text-black md:text-xl capitalize bg-white pt-10">
                                <SubListItem content={ currentCourse.overview } />
                              </div> }

          { currentCourse && currentCourse.fee && <div className=" grid gap-3 py-1 ">
                                <span 
                                  className="font-bold text-xl sm:text-2xl"
                                  > Fee: </span>
                                <SubListItem content={ currentCourse.fee } />
                              </div> }
          
            { currentCourse && 
              currentCourse.modules?.length > 0 ? 
              <Link to={ 'module' } 
              className=" px-6 py-2 rounded-tl-md rounded top-tr-md bg-green-600 hover:bg-green-700 text-white mt-8 block w-fit "> Start Course </Link> : null }

          <div className=" block course-list-container mt-10">
            { currentCourse && <ShowList { ...{ currentCourse, outlines: currentCourse.outlines, objectives: currentCourse.objectives, modules: currentCourse.modules, benefits: currentCourse.benefits } } /> }
          </div>
        </> : <PendingLoading />
      }
    </section>
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
  useEffect(() => {
    let found = false

    list.map((item, index) => {
      if(!found && item.list && item.list.length > 0 ){
        setCurrentTabIndex(index)
        found = true
      }
    })

    list.map((item, index) => {
      console.log('modules', found)
      if(!found && item.modules && item.modules.length > 0 ){
        setCurrentTabIndex(index)
        found = true
      }
    })

    list.map((item, index) => {
      if(!found && item.content ){
        setCurrentTabIndex(index)
        found = true
      }
    })
  }, [])

  return (
    <>
      <div className=" grid grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] w-full gap-1">
        { 
          list.map(( currentList, index) => {
            if(currentList.list && currentList.list.length < 1) return 
            if(currentList.modules && currentList.modules.length < 1) return 
            let classes = `rounded p-2 cursor-pointer hover:bg-green-800 hover:text-white hover:font-bold ${ index === currentTabIndex ? "bg-green-500 text-white font-bold" : "bg-green-300" }`
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
                <div className=" pt-6">
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