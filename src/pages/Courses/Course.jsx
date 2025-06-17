import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import useCourses from "../../Contexts/CoursesContext";
import usePendingLoader from "../../Contexts/PendingLoaderContext";
import { formatUrl } from "../../core";
import { PendingLoading } from '../../Hooks/PendingLoader';

export default function Course(){
  const [currentCourse, setCurrentCourse] = useState(null)
  const { getCourse, coursesList } = useCourses()
  const { setIsPendingLoading } = usePendingLoader()
  let { course } = useParams()
  course = formatUrl(course)

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
      className="grid gap-5 py-10 px-5 sm:px-8 md:px-10 bg-gray-100 lg:max-w-[1440px] mx-auto pb-100"
      >
      { currentCourse && currentCourse.benefits ? <>
        <h2
          className="text-2xl text-center text-black font-extrabold uppercase">
          { currentCourse.course }
        </h2>

       <div className="text-justify">
          <Content { ...{ content: currentCourse.overview } } />
        </div>

          { currentCourse.fee && 
            <div className=" grid gap-3 py-1 ">
              <span 
                className="font-bold text-xl sm:text-2xl"
                > Fee: </span>
                <Content { ...{ content: currentCourse.fee } } />
            </div> }
          
            { currentCourse.modules?.length > 0 ? 
                <Link to={ 'module' } 
                  className=" px-6 py-2 rounded-tl-md rounded top-tr-md bg-green-600 hover:bg-green-700 text-white block w-fit">
                  Start Course
                </Link> : null }
                
          <ShowList { ...{ 
            currentCourse, 
            outlines: currentCourse.outlines, 
            objectives: currentCourse.objectives, 
            modules: currentCourse.modules, 
            benefits: currentCourse.benefits } } />
        </> : <PendingLoading />
      }
    </section>
  )
}

function ShowList({ currentCourse, outlines, objectives, modules, benefits }){
  const [ currentTabIndex, setCurrentTabIndex ] = useState(0)
  const { pathname } = useLocation()
  const setCurrentTab = useCallback((list) => {
    let found = false

    list.map((item, index) => {
      if(!found && item.list && item.list.length > 0 ){
        setCurrentTabIndex(index)
        found = true
      }
    })

    list.map((item, index) => {
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
  }, [currentCourse])
  const list = useMemo(() => [
    { title: 'Outlines', list: outlines },
    { title: 'Benefits', list: benefits },
    { title: 'Objectives', list: objectives },
    { title: 'Modules', modules: modules },
    { title: 'Certificate', content: currentCourse.certificate }
  ], [])
  useEffect(() => {
    setCurrentTab(list)
  }, [pathname, currentCourse, outlines, objectives, modules, benefits])

  return (
    <div
      className="grid gap-5">
      <div className="grid bg-gray-300 grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] w-full">
        { list.map(( currentList, index) => {
            if(currentList.list && currentList.list.length < 1) return 
            if(currentList.modules && currentList.modules.length < 1) return 
            return ( 
              <span 
                  className={`px-3 py-2 text-center cursor-pointer hover:bg-gray-600 hover:text-white ${ index === currentTabIndex ? "bg-gray-800 text-white" : "bg-gray-300 text-gray-900" }`} 
                  key={ currentList.title } 
                  onClick={ () => setCurrentTabIndex(index) } > 
                  { currentList.title }
              </span>
              )
          }) }
      </div>
      <ul>
        <ListItem
          { ...{ currentTabIndex, index: 0, list: list[0].list } } />
        <ListItem
          { ...{ currentTabIndex, index: 1, list: list[1].list } } />
        <ListItem
          { ...{ currentTabIndex, index: 2, list: list[2].list } } />
        <ModuleList
          { ...{ list: list[3].modules, index: 3, currentTabIndex } } />
        <Content
          { ...{ currentTabIndex, index: 4, content: list[4].content, cert: true } } />
      </ul>
    </div>
  )
}

function ListItem({ list, currentTabIndex, index }){
  return (
    <ul 
      className={ `flex-col capitalize ${ currentTabIndex === index ? "flex" : "hidden" }` }>
      { list.map((content, index) => <li 
            key={ index } 
            className=" border-b-1 border-b-gray-300 py-2 ">
          { content }
        </li> ) }
      </ul>
  )
}

function Content({ content, currentTabIndex, index, cert }){
  const _content = useMemo(() => {
    const _s = content.split('. ')
    const s = _s.map( i => {
      const _f = i[0].toUpperCase()
      return _f + i.slice(1, i.length - 1)
    } ).join('. ')
    return s

  }, [content])

  return (
     <p 
      className={`leading-relaxed !first-letter:uppercase ${ currentTabIndex === index ? "flex" : "hidden" } ${ cert ? '[line-height:2.5rem] underline underline-offset-10 text-justify' : '' }`}>
      { _content }
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
  
  return (
    <ul 
      className={ `flex-col capitalize ${  currentTabIndex === index ? "flex" : "hidden" }`}>
      { newList.map( module => <li 
          key={ module._id } 
          className=" py-2 leading-relaxed border-b-1 border-b-gray-300 "> 
          { module.title } 
          </li> ) }
    </ul>
  )
}