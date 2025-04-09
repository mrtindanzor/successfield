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
  const [ modules, setModules] = useState(currentCourse && currentCourse.modules || [])
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

  function appendInput(e, type, object){
    e.preventDefault()
    let item = { _id: Date.now(), [type]: '' }

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

      case 'modules':
        item = { 
          _id: Date.now(),
          index: modules.length + 1,
          title: '',
          outline: '',
          objectives: [{ objective: '' }],
          topics: [{ topic: '' }],
          notes: [{ note: '' }]
        }
        setModules( prev => [ ...prev, item ] )
          break

      case 'moduleObjectives':
        setModules( prev => prev.map( module => {
          const objs = module.objectives
          return { ...module, objectives: [ ...objs, item ] }
        } ))
        break
        
      case 'moduleTopics':
        setModules( prev => prev.map( module => {
          const tpcs = module.topics
          return { ...module, topics: [ ...tpcs, item ] }
        } ))
          break
        
      case 'moduleNotes':
        setModules( prev => prev.map( module => {
          const nts = module.notes
          return { ...module, notes: [ ...nts, item ] }
        } ))
          break
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
            <span onClick={ (e) => appendInput(e, 'objective', 'objectives') } className={ styles.addMore }> + </span>
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
            <span onClick={ (e) => appendInput(e, 'outline', 'outlines') } className={ styles.addMore }> + </span>
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
            <span onClick={ (e) => appendInput(e, 'benefit', 'benefits') } className={ styles.addMore }> + </span>
          </div>
        </label>

        <label data-value='modules'>
          <span>
            Modules:
          </span>
          <div>
            {
              modules.map((module, index) => {
                return <div>
                        <br />
                        <hr />
                        <br />
                        <span> Module { module.index } </span>

                        <label>
                          <span> Title </span>
                          <input type="text" key={ 'moduleTitle' + index } value={ module.title } onChange={ e => setModules( prev => prev.map(currentModule => module._id === currentModule._id ? { ...currentModule, title: e.target.value } : currentModule) ) } />
                        </label>

                        <label>
                          <span> Description </span>
                          <textarea value={ module.description } key={ 'moduleDescription' + index } onChange={ e => setModules( prev => prev.map(currentModule => module._id === currentModule._id ? { ...currentModule, description: e.target.value } : currentModule) ) }></textarea>
                        </label>

                        <label>
                          <span> Outline </span>
                          <input type="text" key={ 'moduleOutline' + index } value={ module.outline } onChange={ e => setModules( prev => prev.map(currentModule => module._id === currentModule._id ? { ...currentModule, outline: e.target.value } : currentModule) ) } />
                        </label>

                        <label>
                          <span> Objectives </span>
                          <div>
                            {
                              module.objectives && module.objectives.map(objective => {
                                return <input type="text" key={ objective._id } onChange={ e => setModules( 
                                  prev => prev.map( currentObjective => {
                                    if(objective._id !== currentObjective._id) return currentObjective

                                    return {
                                      ...currentObjective, 
                                      objectives: currentObjective.objectives?.map( currentObjective => {
                                        if(objective._id !== currentObjective._id) return currentObjective

                                        return { ...currentObjective, objective: e.target.value }
                                      })
                                    }
                                  })
                                ) } />
                              })
                            }
                            <span onClick={ (e) => appendInput(e, 'objective', 'moduleObjectives') } className={ styles.addMore }> + </span>
                          </div>
                        </label>

                        <label>
                          <span> Topics </span>
                          <div>
                            {
                              module.topics && module.topics.map( topic => {
                                return <input type="text" key={ topic._id } onChange={ e => setModules( 
                                  prev => prev.map( currentModule => {
                                    if(module._id !== currentModule._id) return currentModule

                                    return {
                                      ...currentModule, 
                                      topics: currentModule.topics?.map( currentTopic => {
                                        if(topic._id !== currentTopic._id) return currentTopic

                                        return { ...currentTopic, topic: e.target.value }
                                      })
                                    }
                                  })
                                ) } />
                              })
                            }
                            <span onClick={ (e) => appendInput(e, 'topic', 'moduleTopics') } className={ styles.addMore }> + </span>
                          </div>
                        </label>

                        <label>
                          <span> Notes </span>
                          <div>
                            {
                              module.notes && module.notes.map( note => {
                                return <input type="text" key={ note._id } onChange={ e => setModules( 
                                  prev => prev.map( currentModule => {
                                    if(module._id !== currentModule._id) return currentModule

                                    return {
                                      ...currentModule, 
                                      notes: currentModule.notes?.map( currentNote => {
                                        if(note._id !== currentNote._id) return currentNote

                                        return { ...currentNote, note: e.target.value }
                                      })
                                    }
                                  })
                                ) } />
                              })
                            }
                            <span onClick={ (e) => appendInput(e, 'note', 'moduleNotes') } className={ styles.addMore }> + </span>
                          </div>
                        </label>

                        <label>
                          <span> Video Link </span>
                          <input type="text" key={ 'videoLink' + module._id } value={ module.link } onChange={ e => setModules( prev => prev.map(currentModule => module._id === currentModule._id ? { ...currentModule, link: e.target.value } : currentModule) ) } />
                        </label>
                      </div>
                      
              })
            }
            <br />
            <hr />
            <br />
            Add another module
            <span onClick={ (e) => appendInput(e, '', 'modules') } className={ styles.addMore }> + </span>
          </div>
        </label>
        <button> { currentCourse ? 'Edit course' : 'Add course' }  </button>
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