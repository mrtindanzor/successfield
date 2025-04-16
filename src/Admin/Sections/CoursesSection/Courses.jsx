// REACT //
import { useEffect, useState } from 'react';

// STYLES //
import styles from './Courses.module.css';

// OTHERS //
import useCourses from './../../../Contexts/CourseContext/CoursesContext';
import { toggleList } from './../../../Components/Authentication/Registration/Registration'

//tailwind classes
const formClasses = 'grid gap-5 *:bg-gray-200 *:grid *:gap-3 *:p-2 *:max-w-[95vw] *:md:max-w-[750px] *:rounded *:*:first:font-bold *:*:text-lg'
const inputClasses = 'py-2 px-3 border-2 border-gray-600 rounded-lg'
const subInputsClasses = "grid gap-5"
const appendButtonClasses = "w-fit px-4 py-2 text-3xl cursor-pointer text-white rounded bg-gray-950 ml-auto block"
const courseContainerClasses = "grid gap-3 max-w-[95vw] md:max-w-[750px] mb-3"
const courseSelectorClasses = 'p-2 cursor-pointer hover:bg-gray-300 rounded font-semibold text-lg border-1 border-gray-900 '
const coursesDropdownClasses = 'bg-gray-100 *:p-2 *:border-b-1 *:border-b-gray-500 *:hover:bg-green-300 font-normal '

function handleCourseSubmit(e, setters){
  const { setCourse, setCourseCode, setOverview, setFee, setCertificate, setAvailability, setDuration, setObjectives, setBenefits, setOutlines, setFormComplete } = setters
  e.preventDefault()
  const formEl = e.target
  
  const allLabels = formEl.querySelectorAll('label')

  for(const label of allLabels){
    const currentLabel = label.dataset.value
    
    function getInputs(attribute, all = ''){
      if(!all){
        const textArea = label.querySelector('textarea')
        if(!textArea) return label.querySelector('input').value?.trim().toLowerCase()
        return textArea.value?.trim().toLowerCase()
      }

      let arr = []
      const inputs = label.querySelectorAll('input')
      for(const input of inputs){
        const value = input.value?.trim().toLowerCase()
        arr.push ({ [attribute] : value })
      }
      return arr
    }

    switch(currentLabel){
      case 'course':
          setCourse(getInputs('course'))
        break

      case 'courseCode':
          setCourseCode(getInputs('courseCode'))
        break

      case 'overview':
          setOverview(getInputs('overview'))
        break

      case 'fee':
          setFee(getInputs('fee'))
        break

      case 'certificate':
          setCertificate(getInputs('certificate'))
        break

      case 'availability':
          setAvailability(getInputs('availability'))
        break

      case 'duration':
          setDuration(getInputs('duration'))
        break

      case 'objectives':
          setObjectives(getInputs('objective', true))
        break

      case 'outlines':
          setOutlines(getInputs('outline', true))
        break

      case 'benefits':
          setBenefits(getInputs('benefit', true))
        break
    }
    setFormComplete(true)
  }
}

function setCore(selectedCourse,currentCourse, track, setCurrentCourse, setTrack, getCourse){
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

function CourseStructure({ currentCourse, viewCourse, deleteCourse }){
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
  const [ formComplete, setFormComplete] = useState(false)
  const setters = { setCourse, setCourseCode, setOverview, setFee, setCertificate, setAvailability, setDuration, setObjectives, setBenefits, setOutlines, setFormComplete }



  useEffect(() => {
    if(!currentCourse) return
    setCourse(currentCourse.course)
    setCourseCode(currentCourse.courseCode)
    setOverview(currentCourse.overview)
    setFee(currentCourse.fee)
    setCertificate(currentCourse.certificate)
    setAvailability(currentCourse.availability)
    setDuration(currentCourse.duration)
    setObjectives(currentCourse.objectives)
    setBenefits(currentCourse.benefits)
    setOutlines(currentCourse.outlines)
  },[currentCourse])

  useEffect(() => {
    if(formComplete){
      const fullCourse = {
        course, courseCode, overview, certificate, fee, availability, duration, benefits, objectives, outlines
      }

    }
  }, [formComplete])

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
    <form className={ formClasses } onSubmit={ (e) => { handleCourseSubmit(e, setters) }}>
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
                const uKey = Math.random() / Math.random() + Math.random() * Math.random() * ( index + 1 )
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
                const uKey = Math.random() * Math.random() + Math.random() / Math.random() * ( index + 1 )
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
                const uKey = Math.random() * Math.random() + Math.random() * Math.random() * ( index + 1 )
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

        { !viewCourse && <button> { currentCourse ? 'Edit course' : 'Add course' }  </button> }
      </form>
  )
}

function AddCourse(){
  return <CourseStructure />
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
        currentCourse && track === 7 && <CourseStructure currentCourse={ currentCourse } />
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
        currentCourse && <CourseStructure currentCourse={ currentCourse } deleteCourse />
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
    <div className={ styles.coursesTab }> 
      <ul className={ styles.tabSection }>
        {
          sections.map((section, index) => {
            return <li key={ section.title } className={ styles.sectionTitle } onClick={ () => setCurrentSection(index) }> { section.title } </li>
          })
        }
      </ul>
      {
        activeSection
      }
    </div>
  )
}