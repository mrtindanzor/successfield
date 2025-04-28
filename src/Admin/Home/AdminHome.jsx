// STYLES //
import { useMemo, useState } from 'react';
import { PendingLoader } from '../../Contexts/PendingLoaderContext';
import Alerter from '../../Hooks/Alerter';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import { useSearchParams } from 'react-router-dom';
import Courses from '../Sections/Courses'
import Certificates from '../Sections/Certificates'
import { PromptContextProvider, Prompter } from './../Components/Prompt'

export default function AdminHome(){
  const [ currentPage, setCurrentPage ] = useSearchParams({ m: 0 })
  const [ navToggle, setNavToggle ] = useState(false)
  const NavLinks = useMemo(() => [
      { title: 'Courses', section: <Courses /> },
      { title: 'Certificates', section: <Certificates /> },
      { title: 'Registration Center', section: <div></div> },
      { title: 'Partners', section: <div></div> },
      { title: 'Students', section: <div></div> },
    ], [])
  const mainSection = useMemo(() => currentPage.get('m'), [currentPage])

  return (
    <PromptContextProvider>
      <Prompter />
      <PendingLoader />
      <Alerter />
      <Header { ...{ setNavToggle } } />
      <Navbar { ...{ setCurrentPage, NavLinks, navToggle, setNavToggle } } />
      {
        mainSection && NavLinks[mainSection].section
      }
    </PromptContextProvider>
  )
}