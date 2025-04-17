// REACT //
import { useEffect, useReducer, useState } from 'react';

// OTHERS //
import useCourses from './../../../Contexts/CourseContext/CoursesContext';
import { toggleList } from './../../../Components/Authentication/Registration/Registration'
import { useSetAlert } from '../../../Hooks/Alerter/Alerter';
import usePendingLoader from '../../../Contexts/PendingLoaderContext/PendingLoaderContext';
import useServerUri from '../../../Contexts/serverContexts/baseServer';
import { ArrowBigLeftDash, ChevronDown } from 'lucide-react';

//tailwind classes for courses components
const formClasses = 'grid w-fit z-0 gap-5 relative bg-gray-200 my-10  px-2 sm:px-5 md:10 rounded-lg py-10 *:grid *:gap-3 *:p-2 *:w-[95vw] mx-auto *:md:max-w-[1024px] *:rounded *:*:first:font-bold *:*:text-lg'
const inputClasses = 'py-2 px-3 border-2 border-gray-600 rounded-lg block w-full'
const subInputsClasses = "grid gap-5"
const appendButtonClasses = "w-fit px-4 py-2 text-3xl cursor-pointer text-white rounded bg-gray-950 ml-auto block"
const courseContainerClasses = "grid gap-3 w-[95vw] mx-auto border-t-8 border-t-gray-700 pt-5 *:first:font-bold *:first:text-3xl mt-5 md:max-w-[1024px] mb-3"
const courseSelectorClasses = 'p-2 cursor-pointer hover:bg-gray-300 rounded font-semibold text-lg border-1 border-gray-900 '
const coursesDropdownClasses = 'bg-gray-100 *:p-2 *:border-b-1 *:border-b-gray-500 *:hover:bg-green-300 font-normal '
const courseSubmitButtonClasses = "w-[90%] !max-w-[200px] font-bold text-2xl h-fit block px-4 py-2 bg-gray-900 ml-auto cursor-pointer mt-5 hover:bg-gray-500 text-white rounded"

const labelClasses = "grid gap-2 *:first:uppercase *:first:font-bold"

export function Modules(){
  const sections = [
    {
      title: 'Add', section: <AddModule />
    },
    {
      title: 'Edit', section: <EditModule />
    }
  ]

  const [ currentSection, setCurrentSection ] = useState(0)
  const [ activeSection, setActiveSection ] = useState(sections[0].section)
  
  useEffect(() => {
    setActiveSection(sections[currentSection].section)
  }, [currentSection])
   
  return (
    <div className="w-[97vw] mx-auto pt-4"> 
      <ul className="w-[98vw] grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mx-auto">
        {
          sections.map((section, index) => {
            return <li key={ section.title } className={`text-white bg-green-400 rounded cursor-pointer font-semibold text-xl py-1 px-3 ${ currentSection === index ? '!bg-green-700' : '' }`} onClick={ () => setCurrentSection(index) }> { section.title } </li>
          })
        }
      </ul>
      <div className=''>
        {
        activeSection
      }
      </div>
      
    </div>
  )
}

export default function Courses(){
  const sections = [
    {
      title: 'View', section: <ViewCourses />
    },
    {
      title: 'Add', section: <AddCourse />
    },
    {
      title: 'Edit', section: <EditCourse />
    },
    {
      title: 'Modules', section: <Modules />
    }
  ]

  const [ currentSection, setCurrentSection ] = useState(0)
  const [ activeSection, setActiveSection ] = useState(sections[0].section)
  
  useEffect(() => {
    setActiveSection(sections[currentSection].section)
  }, [currentSection])
   
  return (
    <div className="w-[97vw] mx-auto pt-4"> 
      <ul className="w-[98vw] grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mx-auto">
        {
          sections.map((section, index) => {
            return <li key={ section.title } className={`text-white bg-green-400 rounded cursor-pointer font-semibold text-xl py-1 px-3 ${ currentSection === index ? '!bg-green-700' : '' }`} onClick={ () => setCurrentSection(index) }> { section.title } </li>
          })
        }
      </ul>
      <div className=''>
        {
        activeSection
      }
      </div>
      
    </div>
  )
}

function moduleReducer(state, action){

  switch(action.type){
    case 'object':
      return state.map( (module, mIndex) => {
        if(mIndex !== action.index) return module
        return {
          ...module,
          [action.arr]: [...(module[action.arr] || []), '']
        }
      })
    break

    case 'objectFill':
      return state.map( (module, mIndex) => {
        if(mIndex !== action.index) return module
        return {
          ...module,

          [action.arrs]: [...(module[action.arrs] || [])].map((t, tIndex) => {
            if(tIndex !== action.arrIndex) return t
            return action.value
          })
        }
      })
    break


    case 'oneItem':
      return state.map((module, mIndex) => {
        if(mIndex !== action.index) return module
        return {
          ...module,
          [action.item]: action.value
        }
      })
    break

  }
}

function setCore(selectedCourse, currentCourse, track, setCurrentCourse, setTrack, getCourse){
  if(track === 1){
    setCurrentCourse(getCourse(selectedCourse, 'course'))
    setTrack(2)
  }

  if(track > 1){
    switch(track){
      case 2:
        setCurrentCourse( c => ({...c, ...currentCourse }))
        setTrack(3)
          break

      case 3:
        setCurrentCourse( c => ({...c, outlines: [...getCourse(currentCourse.courseCode, 'outlines')] }))
        setTrack(4)
          break

      case 4:
        setCurrentCourse( c => ({...c, benefits: [...getCourse(currentCourse.courseCode, 'benefits')] }))
        setTrack(5)
          break

      case 5:
        setCurrentCourse( c => ({...c, objectives: [...getCourse(currentCourse.courseCode, 'objectives')] }))
        setTrack(6)
          break
    }
  }
}

function toggleModuleList(e){
  e.target.parentElement.classList.toggle('*:not-first:hidden')
}

function fetchCurrentModule(courseCode, getCourse){
  const m = getCourse(courseCode, 'modules')
  return m
}

function AddMoreField({ arr, index, dispatch  }){
  return  <span onClick={ e => dispatch({ type: 'object', arr, index }) } className={ appendButtonClasses }> + </span> 
}

function ModuleStructure({ currentModule, viewModules }){
  const [ modules, modulesDispatch ] = useReducer(moduleReducer, currentModule)
 
  return (
    <form className={ formClasses }>
      {
        modules && modules.map((module, index) => {
          return (<div className='p2 grid pt-10 relative *:not-first:hidden'>
            <span className="flex items-center relative justify-between py-1 px-2 bg-gray-950 text-white text-xl rounded hover:bg-gray-800 before:content-[''] before:absolute before:inset-0 before:z-1" onClick={ e => toggleModuleList(e) }>
              <span>
              Module: { index + 1 }
              </span>
              <ChevronDown className='w-8 h-8' />
            </span>
            <ModuleList arrs='courseCode' title='Course code' index={ index } object={ module } modulesDispatch={ modulesDispatch } />
            <ModuleList arrs='title' title='Title' modulesDispatch={ modulesDispatch } object={ module } index={ index }  />
            <ModuleList arrs='outline' title='outline' modulesDispatch={ modulesDispatch } object={ module } index={ index }  />
            <ModuleList arrs='link' title='Video link' modulesDispatch={ modulesDispatch } object={ module } index={ index }  />
            <ModuleSublist arrs='topics' mainArrs={ module } modulesDispatch={ modulesDispatch } index={ index } /> 
            <ModuleSublist arrs='notes' mainArrs={ module } modulesDispatch={ modulesDispatch } index={ index } /> 
            <ModuleSublist arrs='objectives' mainArrs={ module } modulesDispatch={ modulesDispatch } index={ index } />
          </div>)
        })
      }
    </form>
  )
}

function CourseStructure({ currentCourse, setSelectedCourse,  setCurrentCourse, viewCourse, deleteCourse, operation }){
  const setMsg = useSetAlert()
  const { setRefreshCourses } = useCourses()
  const { setIsPendingLoading } = usePendingLoader()
  const [ course, setCourse] = useState(currentCourse && currentCourse.course || '')
  const [ courseCode, setCourseCode] = useState(currentCourse && currentCourse.courseCode || '')
  const [ overview, setOverview] = useState(currentCourse && currentCourse.overview || '')
  const [ fee, setFee] = useState(currentCourse && currentCourse.fee || '')
  const [ certificate, setCertificate] = useState(currentCourse && currentCourse.certificate || '')
  const [ availability, setAvailability] = useState(currentCourse && currentCourse.availability || '')
  const [ duration, setDuration] = useState(currentCourse && currentCourse.duration || '')
  const [ objectives, setObjectives] = useState(currentCourse && currentCourse.objectives || [])
  const [ benefits, setBenefits] = useState(currentCourse && currentCourse.benefits || [])
  const [ outlines, setOutlines] = useState(currentCourse && currentCourse.outlines || [])
  const [ previousCourseCode, setPreviousCourseCode ] = useState('')
  
  function reset(){
    setCourse('')
    setCourseCode('')
    setOverview('')
    setFee('')
    setCertificate('')
    setAvailability('')
    setDuration('')
    setObjectives([])
    setBenefits([])
    setOutlines([])
    setPreviousCourseCode ('')
  }

  const uri = useServerUri() + 'courses'
  const details = {
                    course,
                    courseCode,
                    previousCourseCode,
                    overview,
                    fee,
                    certificate,
                    availability,
                    duration,
                    objectives,
                    benefits,
                    outlines,
                    operation
                  }

  async function handleCourseOperation(e){
    e.preventDefault()
    
    setIsPendingLoading(true)
    try {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      const method = "PATCH"
      const body = JSON.stringify(details)
      const options = { 
        headers,
        method,
        body
       }

      const response = await fetch(uri, options)
      const res = await response.json()
      setMsg(res.msg)
      if(res.status === 201){
        setRefreshCourses(true)
        if(operation === 'add'){
          reset()
        }
          else {
            setCurrentCourse('')
            setSelectedCourse('')
          }
      }
    } 
      catch (err) {
        setMsg(err.msg)
      }
        finally{
          setIsPendingLoading(false)
        }
  }
                  
  useEffect(() => {
    if(operation !== 'add') setPreviousCourseCode(currentCourse.courseCode)
  },[])

  function appendInput(e, type, object){
    e.preventDefault()
    let item = ''

    switch(object){
      case 'objectives':
        setObjectives( prev => [...prev, item] )
          break
      
      case 'outlines':
        setOutlines( prev => [...prev, item] )
          break

      case 'benefits':
        setBenefits( prev => [...prev, item] )
          break
    }

  }

  return (
    <form className={ formClasses } onSubmit={ e => handleCourseOperation(e) }>
        <label data-value='course'>
          <span>
            Course name: 
          </span>
          {
            viewCourse ? 
            <textarea className={ inputClasses } disabled value={ course } ></textarea>
            : <input className={ inputClasses } type="text" value={ course } onChange={ e => setCourse(e.target.value) } required  />
          }
        </label>

        <label data-value='courseCode'>
          <span>
            Course code: 
          </span>
          <input className={ inputClasses } disabled={ viewCourse } type="text" value={ courseCode } onChange={ e => setCourseCode(e.target.value) } required  />
        </label>

        <label data-value='overview'>
          <span>
            Course overview: 
          </span>
          <textarea className={ inputClasses } disabled={ viewCourse }  value={ overview } onChange={ e => setOverview(e.target.value) }></textarea>
        </label>

        <label data-value='fee'>
          <span>
            Course fee: 
          </span>
          {
            viewCourse ? 
            <textarea className={ inputClasses } disabled value={ fee } ></textarea>
            : <input className={ inputClasses } type="text" value={ fee } onChange={ e => setFee(e.target.value) } required  />
          }
        </label>

        <label data-value='certificate'>
          <span>
            Certification: 
          </span>
          {
            viewCourse ? 
            <textarea className={ inputClasses } disabled value={ certificate } ></textarea>
            : <input className={ inputClasses } type="text" value={ certificate } onChange={ e => setCertificate(e.target.value) } required  />
          }
        </label>

        <label data-value='availability'>
          <span>
            Availability: 
          </span>
          {
            viewCourse ? 
            <textarea className={ inputClasses } disabled value={ availability } ></textarea>
            : <input className={ inputClasses } type="text" value={ availability } onChange={ e => setAvailability(e.target.value) } required  />
          }
        </label>

        <label data-value='duration'>
          <span>
            Duration: 
          </span>
          {
            viewCourse ? 
            <textarea className={ inputClasses } disabled value={ course } ></textarea>
            : <input className={ inputClasses } type="text" value={ duration } onChange={ e => setDuration(e.target.value) } required  />
          }
        </label>

        <label data-value='objectives'>
          <span>
            Objectives:
          </span>
          <div className={ subInputsClasses } >
            {
              objectives.map((objective, index) => {
                const uKey = index
                if(viewCourse) return <textarea className={ inputClasses } disabled key={ uKey } value={ objective } onChange={ 
                  (e) => { 
                    e.preventDefault()
                    setObjectives( prev => prev.map((objective, i) => index === i ? e.target.value : objective ) ) }
                } ></textarea>
                return <input className={ inputClasses } type="text" key={ uKey } value={ objective } onChange={ 
                  (e) => { 
                    e.preventDefault()
                    setObjectives( prev => prev.map((objective, i) => index === i ? e.target.value : objective ) ) }
                } />
              })
            }
            { !viewCourse && <AddMoreField setter={ setObjectives } type='array' /> }
          </div>
        </label>

        <label data-value='outlines'>
          <span>
            Outlines:
          </span>
          <div className={ subInputsClasses } >
            {
              outlines.map((outline, index) => {
                const uKey = index
                if(viewCourse) return <textarea className={ inputClasses } disabled key={ uKey } value={ outline } onChange={ 
                  (e) => { 
                    e.preventDefault()
                    setOutlines( prev => prev.map((outline, i) => index === i ? e.target.value : outline ) ) }
                } ></textarea>
                return <input className={ inputClasses } type="text" key={ uKey } value={ outline } onChange={ 
                  (e) => { 
                    e.preventDefault()
                    setOutlines( prev => prev.map((outline, i) => index === i ? e.target.value : outline ) ) }
                }  />
              })
            }
            { !viewCourse && <AddMoreField setter={ setOutlines } type='array' /> }
          </div>
        </label>

        <label data-value='benefits'>
          <span>
            Benefits:
          </span>
          <div className={ subInputsClasses } >
            {
              benefits.map((benefit, index) => {
                const uKey = index
                if(viewCourse) return <textarea className={ inputClasses } disabled key={ uKey } value={ benefit } onChange={ 
                  (e) => { 
                    e.preventDefault()
                    setBenefits( prev => prev.map((benefit, i) => index === i ? e.target.value : benefit ) ) } } ></textarea>
                return <input className={ inputClasses } type="text" key={ uKey } value={ benefit } onChange={ 
                  (e) => { 
                    e.preventDefault()
                    setBenefits( prev => prev.map((benefit, i) => index === i ? e.target.value : benefit ) ) }
                } />
              })
            }
            { !viewCourse && <AddMoreField setter={ setBenefits } type='array' /> }
          </div>
        </label>

        { !viewCourse && <button className={ courseSubmitButtonClasses }> { currentCourse ? 'Edit course' : 'Add course' }  </button> }
      </form>
  )
}

function AddCourse(){
  return <CourseStructure operation={ 'add' } />
}

function EditCourse(){
  const [ selectedCourse, setSelectedCourse ] = useState('')
  const { getCourse } = useCourses()
  const [ currentCourse, setCurrentCourse ] = useState('')
  const [ track, setTrack ] = useState(0)

  useEffect(() => {
    setCore(selectedCourse,currentCourse, track, setCurrentCourse, setTrack, getCourse)
  }, [ track ])

  return (
    <>
      <CourseSeletor selectedCourse={ selectedCourse } setTrack={ setTrack } setSelectedCourse={ setSelectedCourse }  />
      {
        currentCourse && track === 6 && <CourseStructure currentCourse={ currentCourse } setCurrentCourse={ setCurrentCourse } setSelectedCourse={ setSelectedCourse } operation={ 'edit' } />
      }
    </>
  )
}

function ViewCourses(){
  const [ selectedCourse, setSelectedCourse ] = useState('')
  const { getCourse } = useCourses()
  const [ currentCourse, setCurrentCourse ] = useState('')
  const [ track, setTrack ] = useState(0)

  useEffect(() => {
    setCore(selectedCourse,currentCourse, track, setCurrentCourse, setTrack, getCourse)
  }, [ track ])

  return (
    <>
      <CourseSeletor selectedCourse={ selectedCourse } setTrack={ setTrack } setSelectedCourse={ setSelectedCourse }  />
      {
        currentCourse && track === 6 && <CourseStructure currentCourse={ currentCourse } viewCourse />
      }
    </>
  )
}

function AddModule(){
  return <ModuleStructure />
}

function EditModule(){
  const [ selectedCourse, setSelectedCourse ] = useState('')
  const { getCourse } = useCourses()
  const [ currentCourse, setCurrentCourse ] = useState('')
  const [ currentModule, setCurrentModule ] = useState([])
  const [ track, setTrack ] = useState(0)

  useEffect(() => {
    if(track === 1) {
      setCurrentCourse(getCourse(selectedCourse, 'course'))
      setTrack(2)
    }
    if(track === 2){
      setCurrentModule(fetchCurrentModule(currentCourse.courseCode, getCourse))
      setTrack(3)
    }

  }, [ track ])

  return (
    <>
      <CourseSeletor selectedCourse={ selectedCourse } setTrack={ setTrack } setSelectedCourse={ setSelectedCourse }  />
      {
        currentModule && track === 3 && <ModuleStructure 
                                          currentModule={ currentModule }
                                          setSelectedCourse={ setSelectedCourse } />
      }
    </>
  )
}

function ModuleList({ arrs, object, title, modulesDispatch, index }){
  
  return(
    <label className={ labelClasses }>
    <span className={ " " }> { title } </span>
    <textarea key={ index } className={ inputClasses } value={ object[arrs] }
      onChange={ e =>  modulesDispatch({ type: 'oneItem', index, item: arrs, value: e.target.value  }) }  ></textarea>
    </label>
  )
}

function ModuleSublist({mainArrs, arrs, index, modulesDispatch }){

  return(
    <div className={ labelClasses }>
    <span>{ arrs }</span>
    {
      mainArrs[arrs] && mainArrs[arrs].map((arr, arrIndex) => {
        return (
            <label className={ '' } key={ arrIndex }>
              <textarea className={ inputClasses }
                onChange={ e => modulesDispatch({ type: 'objectFill', index, arrs, arrIndex, value: e.target.value  }) }  ></textarea>
            </label>
        )
      })
    }
    <AddMoreField dispatch={ modulesDispatch } index={ index } type='object' arr={ arrs } />
  </div>
  )
}

function CourseSeletor({ selectedCourse, setSelectedCourse, setTrack }){
  const { coursesList } = useCourses()
  const [ courseVisible, setCoursesVisible ] = useState(false)



  return(
    <ul className={ courseContainerClasses }>
        <label> Programme </label>
        <span className={ courseSelectorClasses } onClick={ () => setCoursesVisible(c => !c) }>
          { !selectedCourse && 'Select programme' }
          { selectedCourse && selectedCourse }
        </span>
        {
          courseVisible && <div className={ coursesDropdownClasses }>
          {
            coursesList.map((course, index) => {
              return <li key={ Date.now() + '-' + index } onClick={ e => {
                setSelectedCourse(course.course)
                setCoursesVisible(false)
                setTrack(1)
              }
            }> { course.course } </li>
            })
          }
        </div>
        }
      </ul>
  )
}