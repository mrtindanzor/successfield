// REACT //
import { useEffect, useState } from 'react';

// OTHERS //
import useCourses from './../../../Contexts/CourseContext/CoursesContext';
import { toggleList } from './../../../Components/Authentication/Registration/Registration'
import { useSetAlert } from '../../../Hooks/Alerter/Alerter';
import usePendingLoader from '../../../Contexts/PendingLoaderContext/PendingLoaderContext';
import useServerUri from '../../../Contexts/serverContexts/baseServer';

//tailwind classes
const formClasses = 'grid w-fit gap-5 bg-gray-200 my-10  px-2 sm:px-5 md:10 rounded-lg py-10 *:grid *:gap-3 *:p-2 *:w-[95vw] mx-auto *:md:max-w-[1024px] *:rounded *:*:first:font-bold *:*:text-lg'
const inputClasses = 'py-2 px-3 border-2 border-gray-600 rounded-lg'
const subInputsClasses = "grid gap-5"
const appendButtonClasses = "w-fit px-4 py-2 text-3xl cursor-pointer text-white rounded bg-gray-950 ml-auto block"
const courseContainerClasses = "grid gap-3 w-[95vw] mx-auto border-t-8 border-t-gray-700 pt-5 *:first:font-bold *:first:text-3xl mt-5 md:max-w-[1024px] mb-3"
const courseSelectorClasses = 'p-2 cursor-pointer hover:bg-gray-300 rounded font-semibold text-lg border-1 border-gray-900 '
const coursesDropdownClasses = 'bg-gray-100 *:p-2 *:border-b-1 *:border-b-gray-500 *:hover:bg-green-300 font-normal '
const courseSubmitButtonClasses = "w-[90%] !max-w-[200px] font-bold text-2xl h-fit block px-4 py-2 bg-gray-900 ml-auto cursor-pointer mt-5 hover:bg-gray-500 text-white rounded"

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

      case 6:
        setCurrentCourse( c => ({...c, modules: [...getCourse(currentCourse.courseCode, 'modules')] }))
        setTrack(7)
          break
    }
  }
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
            { !viewCourse && <span onClick={ (e) => appendInput(e, 'objective', 'objectives') } className={ appendButtonClasses }> + </span> }
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
            { !viewCourse && <span onClick={ (e) => appendInput(e, 'outline', 'outlines') } className={ appendButtonClasses }> + </span> }
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
            { !viewCourse && <span onClick={ (e) => appendInput(e, 'benefit', 'benefits') } className={ appendButtonClasses }> + </span> }
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
  const { getCourse, coursesList } = useCourses()
  const [ currentCourse, setCurrentCourse ] = useState('')
  const [ track, setTrack ] = useState(0)
  const [ courseVisible, setCoursesVisible ] = useState(false)

  useEffect(() => {
    setCore(selectedCourse,currentCourse, track, setCurrentCourse, setTrack, getCourse)
  }, [ track ])

  return (
    <>
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
                  toggleList(e, 'list')
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
      {
        currentCourse && track === 7 && <CourseStructure currentCourse={ currentCourse } setCurrentCourse={ setCurrentCourse } setSelectedCourse={ setSelectedCourse } operation={ 'edit' } />
      }
    </>
  )
}

function ViewCourses(){
  const [ selectedCourse, setSelectedCourse ] = useState('')
  const { getCourse, coursesList } = useCourses()
  const [ currentCourse, setCurrentCourse ] = useState('')
  const [ track, setTrack ] = useState(0)
  const [ courseVisible, setCoursesVisible ] = useState(false)

  useEffect(() => {
    setCore(selectedCourse,currentCourse, track, setCurrentCourse, setTrack, getCourse)
  }, [ track ])

  return (
    <>
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
                toggleList(e, 'list')
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
      {
        currentCourse && track === 7 && <CourseStructure currentCourse={ currentCourse } viewCourse />
      }
    </>
  )
}

function DeleteCourse(){
  const [ selectedCourse, setSelectedCourse ] = useState('')
  const { getCourse, coursesList } = useCourses()
  const [ currentCourse, setCurrentCourse ] = useState('')

  useEffect(() => {
    selectedCourse && setCurrentCourse(getCourse(selectedCourse))
  }, [ selectedCourse ])

  return (
    <>
      <ul className={ courseContainerClasses }>
        <label> Programme </label>
        <span className={ courseSelectorClasses } onClick={ e => toggleList(e, 'span') }>
          { !selectedCourse && 'Select programme' }
          { selectedCourse && selectedCourse }
        </span>
        <div className={ coursesDropdownClasses }>
          {
            coursesList.map((course, index) => {
              return <li key={ Date.now() + '-' + index } onClick={ e => {
                toggleList(e, 'list')
                setSelectedCourse(course.course)
              }
            }> { course.course } </li>
            })
          }
        </div>
      </ul>
      {
        currentCourse && <CourseStructure currentCourse={ currentCourse } setSelectedCourse={ setSelectedCourse } operation={ 'delete' } deleteCourse />
      }
    </>
  )
}

export default function Courses(){
  const sections = [
    {
      title: 'View Courses', section: <ViewCourses />
    },
    {
      title: 'Add a course', section: <AddCourse />
    },
    {
      title: 'Edit a course', section: <EditCourse />
    },
    {
      title: 'Delete a course', section: <DeleteCourse />
    },
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