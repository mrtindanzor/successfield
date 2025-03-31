// REACT //
import { useEffect, useState } from 'react';

// STYLES //
import styles from './Courses.module.css';

// OTHERS //
import useCourses from './../../../Contexts/CourseContext/CoursesContext';

function appendInput(e){
  const element = e.target.parentElement

  const input = document.createElement('input')
  element.insertBefore(input, e.target)
}

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

function CourseStructure({ currentCourse = {} }){
  const [ course, setCourse] = useState(currentCourse.course || '')
  const [ courseCode, setCourseCode] = useState(currentCourse.courseCode || '')
  const [ overview, setOverview] = useState(currentCourse.overview || '')
  const [ fee, setFee] = useState(currentCourse.fee || '')
  const [ certificate, setCertificate] = useState(currentCourse.certificate || '')
  const [ availability, setAvailability] = useState(currentCourse.availability || '')
  const [ duration, setDuration] = useState(currentCourse.duration || '')
  const [ objectives, setObjectives] = useState(currentCourse.objectives || '')
  const [ benefits, setBenefits] = useState(currentCourse.benefits || '')
  const [ outlines, setOutlines] = useState(currentCourse.outlines || '')
  const [ formComplete, setFormComplete] = useState(false)
  const setters = { setCourse, setCourseCode, setOverview, setFee, setCertificate, setAvailability, setDuration, setObjectives, setBenefits, setOutlines, setFormComplete }

  useEffect(() => {
    if(formComplete){
      const fullCourse = {
        course, courseCode, overview, certificate, fee, availability, duration, benefits, objectives, outlines
      }
      console.log(fullCourse)

    }
  }, [formComplete])

  return (
    <form className={ styles.addCourseForm } onSubmit={ (e) => { handleCourseSubmit(e, setters) }}>
        <label data-value='course'>
          <span>
            Course name: 
          </span>
          <input type="text" required  />
        </label>

        <label data-value='courseCode'>
          <span>
            Course code: 
          </span>
          <input type="text" required />
        </label>

        <label data-value='overview'>
          <span>
            Course overview: 
          </span>
          <textarea></textarea>
        </label>

        <label data-value='fee'>
          <span>
            Course fee: 
          </span>
          <input type="text" />
        </label>

        <label data-value='certificate'>
          <span>
            Certification: 
          </span>
          <input type="text" required />
        </label>

        <label data-value='availability'>
          <span>
            Availability: 
          </span>
          <input type="text" />
        </label>

        <label data-value='duration'>
          <span>
            Duration: 
          </span>
          <input type="text" />
        </label>

        <label data-value='objectives'>
          <span>
            Objectives:
          </span>
          <div>
            {
              currentCourse.objectives ? currentCourse.objectives.map((objective, index) => {
                return <input type="text" key={ objective.objective + index } value={ objective.objective } />
              }) : <input type="text" />
            }
            <span onClick={ (e) => appendInput(e) } className={ styles.addMore }> + </span>
          </div>
        </label>

        <label data-value='outlines'>
          <span>
            Outlines:
          </span>
          <div>
            {
              currentCourse.outlines ? currentCourse.outlines.map((outline, index) => {
                return <input type="text" key={ outline.outline + index } value={ outline.outline } />
              }) : <input type="text" />
            }
            <span onClick={ (e) => appendInput(e) } className={ styles.addMore }> + </span>
          </div>
        </label>

        <label data-value='benefits'>
          <span>
            Benefits:
          </span>
          <div>
            {
              currentCourse.benefits ? currentCourse.benefits.map((benefit, index) => {
                return <input type="text" key={ benefit.benefit + index } value={ benefit.benefit } />
              }) : <input type="text" />
            }
            <span onClick={ (e) => appendInput(e) } className={ styles.addMore }> + </span>
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
  const { getCourse, coursesList } = useCourses()
  const [ currentCourse, setCurrentCourse ] = useState('')

  useEffect(() => {
    if(coursesList){
      const c = getCourse(`professional diploma in nursing assistant studies(healthcare assistant studies)`)
      setCurrentCourse(c)
    }
    console.log(coursesList)
  }, [coursesList])

  return (
    <>
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