// STYLES //
import { useMemo, useCallback, useEffect, useState, useContext, createContext, useRef } from 'react';
import Loader from '../../Components/Loader';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import { useSearchParams } from 'react-router-dom';
import { AddCourse, EditCourse } from '../Sections/Courses'
import { AddModule, EditModule } from '../Sections/Modules'
import { AddCertificate, EditCertificate } from '../Sections/Certificates'
import { PromptContextProvider, Prompter } from './../Components/Prompt'
import { Applications, CourseRegistration } from '../Sections/RegistrationCenter';
import Students from '../Sections/Students';
import { NewAccreditations } from '../Sections/Accreditations';
import { AddFaq } from '../Sections/Faq';
import DisplayNotification from '../../Components/DisplayNotification';

const FeedbackContext = createContext()

export default function AdminHome(){
  const timeoutId = useRef()
  const [ feedback, setFeedback ] = useState({ })
  const [ currentPage, setCurrentPage ] = useSearchParams({ m: 0, s: 0 })
  const NavLinks = useMemo(() => [
      { 
        title: 'Courses',
        sub: [
          { title: 'Add courses', section: <AddCourse /> },
          { title: 'Edit courses', section: <EditCourse /> }
        ]
      },
      { 
        title: 'Modules',
        sub: [
          { title: 'Add', section: <AddModule /> },
          { title: 'Edit', section: <EditModule /> }
        ]
      },
      { 
        title: 'Certificates',
        sub: [
          { title: 'Add certificate', section: <AddCertificate /> },
          { title: 'Edit certificate', section: <EditCertificate /> }
        ]
       },
      { 
        title: 'Registration Center',
        sub: [
          { title: 'Applications', section: <Applications /> },
          { title: 'Courses', section: <CourseRegistration /> }
        ]
      },
      { 
        title: 'Students', 
        sub: [
          { title: 'Students', section: <Students />  }
        ]
      },
      { 
        title: 'Accreditations', 
        sub: [
          { title: 'Add accredited partner', section: <NewAccreditations /> }
        ]
      },
      { 
        title: 'Faq', 
        sub: [
          { title: 'Add Faq', section: <AddFaq /> }
        ]
      },
    ], [])
  const mainSection = useMemo(() => currentPage.get('m'), [currentPage])
  const subSection = useMemo(() => currentPage.get('s'), [currentPage])
  const setSubPage = useCallback((s) => {
    const m = currentPage.get('m')
    setCurrentPage({ m, s })
  }, [currentPage])
  useEffect(() => {
    if(feedback.message) timeoutId.current = setTimeout(() => setFeedback({}) ,7000)

    return () => timeoutId.current && clearTimeout(timeoutId.current)
  },[feedback])
  useEffect(() => {
    document.title = `Dashboard - ${ NavLinks[mainSection].title }`
    mainSection && NavLinks[mainSection].sub && setSubPage(subSection || 0)
  }, [mainSection])

  return (
    <PromptContextProvider>
      <Prompter />
      <FeedbackContext.Provider value={ setFeedback }>
        <div 
        className="grid h-fit min-h-[100vh] tuffy grid-rows-[auto_auto_1fr] md:grid-rows-[auto_1fr] md:grid-cols-[auto_1fr] bg-white gap-x-5"
        >
        <Header />
        <Navbar { ...{ setCurrentPage, NavLinks, mainSection } } />
        <div
          className={`grid ${ feedback.message ? 'grid-rows-[auto_auto_1fr]' :'grid-rows-[auto_1fr]' } bg-white rounded px-5 sm:px-8 md:px-10 py-3 gap-5 sm:gap-8 md:gap-10`}
          >
            { feedback.message && <DisplayNotification { ...{ feedback } } /> }
            { mainSection && NavLinks[mainSection].sub?.length > 1 && <ul className="flex flex-wrap gap-3">
              { NavLinks[mainSection].sub.map((sub, subIndex) => {
                return <li
                  className={`px-4 py-2 whitespace-nowrap text-center min-w-30 md:min-w-40 w-fit sm:text-lg rounded cursor-pointer text-white font-bold hover:!bg-black/60 ${ subIndex == subSection ? 'bg-gray-950' : 'bg-gray-400' }`}
                  onClick={ () => setSubPage(subIndex) }
                  key={ subIndex }
                  >
                    { sub.title }
                </li>
            }) }
              </ul> }
            { subSection && mainSection && NavLinks[mainSection] && NavLinks[mainSection].sub && NavLinks[mainSection].sub[subSection].section }
        </div>
      </div>
      </FeedbackContext.Provider>
    </PromptContextProvider>
  )
}

export function useSetFeedback(){ return useContext( FeedbackContext ) }