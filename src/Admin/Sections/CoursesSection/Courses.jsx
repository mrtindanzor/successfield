// REACT //
import { useEffect, useState } from 'react';

// STYLES //
import styles from './Courses.module.css';

// OTHERS //
import useCourses from './../../../Contexts/CourseContext/CoursesContext';
import { toggleList } from './../../../Components/Authentication/Registration/Registration'

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

function CourseStructure({ currentCourse }){
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
    console.log(currentCourse)
  },[currentCourse])

  useEffect(() => {
    if(formComplete){
      const fullCourse = {
        course, courseCode, overview, certificate, fee, availability, duration, benefits, objectives, outlines
      }

    }
  }, [formComplete])

  function appendInput(e, type){
    e.preventDefault()
    const item = { _id: Date.now(), [type]: '' }
    
    if(type === 'objective'){
      setObjectives( prev => [...prev, item] )
    }
    if(type === 'outline'){
      setOutlines( prev => [...prev, item] )
    }
    if(type === 'benefit'){
      setBenefits( prev => [...prev, item] )
    }
  }

  return (
    <form className={ styles.addCourseForm } onSubmit={ (e) => { handleCourseSubmit(e, setters) }}>
        <label data-value='course'>
          <span>
            Course name: 
          </span>
          <input type="text" value={ course } onChange={ e => setCourse(e.target.value) } required  />
        </label>

        <label data-value='courseCode'>
          <span>
            Course code: 
          </span>
          <input type="text" value={ courseCode } onChange={ e => setCourseCode(e.target.value) } required  />
        </label>

        <label data-value='overview'>
          <span>
            Course overview: 
          </span>
          <textarea value={ overview } onChange={ e => setOverview(e.target.value) }></textarea>
        </label>

        <label data-value='fee'>
          <span>
            Course fee: 
          </span>
          <input type="text" value={ fee } onChange={ e => setFee(e.target.value) } />
        </label>

        <label data-value='certificate'>
          <span>
            Certification: 
          </span>
          <input type="text" value={ certificate } onChange={ e => setCertificate(e.target.value) } required />
        </label>

        <label data-value='availability'>
          <span>
            Availability: 
          </span>
          <input type="text" value={ availability } onChange={ e => setAvailability(e.target.value) } />
        </label>

        <label data-value='duration'>
          <span>
            Duration: 
          </span>
          <input type="text" value={ duration } onChange={ e => setDuration(e.target.value) } />
        </label>

        <label data-value='objectives'>
          <span>
            Objectives:
          </span>
          <div>
            {
              objectives.map((objective, index) => {
                return <input type="text" key={ objective._id } value={ objective.objective } onChange={ 
                  (e) => { 
                    e.preventDefault()
                    setObjectives( prev =>
                    prev.map((objective, i) =>
                     i === index ? { ...objective, objective: e.target.value } : objective
                    )
                  ) }
                } />
              })
            }
            <span onClick={ (e) => appendInput(e, 'objective') } className={ styles.addMore }> + </span>
          </div>
        </label>

        <label data-value='outlines'>
          <span>
            Outlines:
          </span>
          <div>
            {
              outlines.map((outline, index) => {
                return <input type="text" key={ outline._id } value={ outline.outline } onChange={ 
                  (e) => { 
                    e.preventDefault()
                    setOutlines( prev =>
                    prev.map((outline, i) =>
                     i === index ? { ...outline, outline: e.target.value } : outline
                    )
                  ) }
                }  />
              })
            }
            <span onClick={ (e) => appendInput(e, 'outline') } className={ styles.addMore }> + </span>
          </div>
        </label>

        <label data-value='benefits'>
          <span>
            Benefits:
          </span>
          <div>
            {
              benefits.map((benefit, index) => {
                return <input type="text" key={ benefit._id } value={ benefit.benefit } onChange={ 
                  (e) => { 
                    e.preventDefault()
                    setBenefits( prev =>
                    prev.map((benefit, i) =>
                     i === index ? { ...benefit, benefit: e.target.value } : benefit
                    )
                  ) }
                } />
              })
            }
            <span onClick={ (e) => appendInput(e, 'benefit') } className={ styles.addMore }> + </span>
          </div>
        </label>
        <button> Add course </button>
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

  useEffect(() => {
    selectedCourse && setCurrentCourse(getCourse(selectedCourse))
  }, [ selectedCourse ])

  return (
    <>
      <ul className={ styles.coursesSelector }>
        <label> Programme </label>
        <span onClick={ e => toggleList(e, 'span') }>
          { !selectedCourse && 'Select programme' }
          { selectedCourse && selectedCourse }
        </span>
        <div>
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
        currentCourse && <CourseStructure currentCourse={ currentCourse } />
      }
    </>
  )
}

export default function Courses(){
  const sections = [
    {
      title: 'View Courses', section: <div></div>
    },
    {
      title: 'Add a course', section: <AddCourse />
    },
    {
      title: 'Edit a course', section: <EditCourse />
    },
    {
      title: 'Delete a course', section: <div/>
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