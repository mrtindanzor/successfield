// STYLES //
import { useMemo, useCallback, useEffect } from 'react';
import { PendingLoader } from '../../Contexts/PendingLoaderContext';
import Alerter from '../../Hooks/Alerter';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import { useSearchParams } from 'react-router-dom';
import { AddCourse, EditCourse, Modules } from '../Sections/Courses'
import { AddCertificate, EditCertificate } from '../Sections/Certificates'
import { PromptContextProvider, Prompter } from './../Components/Prompt'
import { Applications, CourseRegistration } from '../Sections/RegistrationCenter';
import Students from '../Sections/Students';
import { NewAccreditations } from '../Sections/Accreditations';
import { AddFaq } from '../Sections/Faq';

export default function AdminHome(){
  const [ currentPage, setCurrentPage ] = useSearchParams({ m: 0, s: 0 })
  const NavLinks = useMemo(() => [
      { 
        title: 'Courses',
        sub: [
          { title: 'Add courses', section: <AddCourse /> },
          { title: 'Edit courses', section: <EditCourse /> },
          { title: 'Modules', section: <Modules /> }
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
        section: <Students /> 
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
    document.title = `Dashboard - ${ NavLinks[mainSection].title }`
    mainSection && NavLinks[mainSection].sub && setSubPage(subSection || 0)
  }, [mainSection])

  return (
    <PromptContextProvider>
      <Prompter />
      <PendingLoader />
      <Alerter />
      <div 
        className="grid h-fit min-h-[100vh] grid-rows-[auto_auto_1fr] md:grid-rows-[auto_1fr] md:grid-cols-[auto_1fr] px-1 sm:px-8 md:px-10 bg-gray-200 gap-y-2 gap-x-5"
        >
        <Header />
        <Navbar { ...{ setCurrentPage, NavLinks, mainSection } } />
        <div
          className="grid grid-rows-[auto_1fr] bg-white rounded px-1 sm:px-8 md:px-10 py-3 gap-5 sm:gap-8 md:gap-10"
          >
            { mainSection && NavLinks[mainSection].sub && <ul className="flex flex-wrap gap-3"
              >
                { NavLinks[mainSection].sub.map((sub, subIndex) => {
                  return <li
                    className={`p-1 whitespace-nowrap w-fit px-2 sm:text-lg rounded cursor-pointer text-white font-bold hover:bg-gray-950 ${ subIndex == subSection ? 'bg-gray-950' : 'bg-gray-400' }`}
                    onClick={ () => setSubPage(subIndex) }
                    key={ subIndex }
                    >
                      { sub.title }
                  </li>
            }) }
              </ul> }
            { !subSection && mainSection && NavLinks[mainSection].section }
            { subSection && mainSection && NavLinks[mainSection] && NavLinks[mainSection].sub && NavLinks[mainSection].sub[subSection].section }
        </div>
      </div>
    </PromptContextProvider>
  )
}