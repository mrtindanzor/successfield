import { useEffect, useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import useCourses from "../Contexts/CoursesContext";
import { ChevronLeft, ChevronRight, FileText, X } from "lucide-react";
import useAuth from "../Contexts/AuthenticationContext";

export function MenuButton({ navbarActive, setNavbarActive }){
  
  const toggleWrapperClasses="flex items-center h-full *:first:w-10 *:first:h-10 text-white flex *:p-1 cursor-pointer md:hidden *:first:items-center *:first:justify-center *:first:rounded"

  return (
    <>
      <div className={ toggleWrapperClasses }>
        <X  
        className={`bg-red-600 ${ navbarActive ? 'flex' : 'hidden' }`}
        onClick={ () => setNavbarActive(false) } />
        <div  
          className={`w-10 h-10 gap-1.5 grid  ${ navbarActive ? 'hidden' : '' }`} 
          onClick={() => setNavbarActive(true) }>
          <div className="w-7 h-1 rounded-lg bg-gray-500"></div>
          <div className="w-7 h-1 rounded-lg bg-gray-500 ml-auto"></div>
          <div className="w-7 h-1 rounded-lg bg-gray-500"></div>
        </div>
      </div>
    </>
  )
}

export default function Navbar({ coursesActive, setCoursesActive, navbarActive, setNavbarActive }){
  const { coursesList } = useCourses()
  const { isLoggedIn } = useAuth()
  
  const MenuItems = [
    { title: 'Home', },
    { title: 'Courses', list: coursesList, },
    { title: 'Verify Certificate' },
    { title: 'Accreditations' },
    { title: 'Faqs' },
    // { title: 'About us' },
    // { title: 'Contact us' }
  ]

  useEffect(() => {
    if(!navbarActive && coursesActive) setCoursesActive(false)
  }, [navbarActive])

  useEffect(() => {
      navbarActive || coursesActive ? document.body.classList.add('!overflow-hidden') : document.body.classList.remove('!overflow-hidden')
  }, [navbarActive, coursesActive])
  
  return (
      <nav 
        className={`${ !navbarActive && 'translate-x-[-100vw] md:translate-0' } md:col-span-full transition md:transition-none duration-300 absolute md:static left-0 top-[3.75rem] border-t-2 border-t-gray-200 md:border-none w-full h-[calc(100vh-3.5rem)] md:h-fit grid grid-cols-[80%_20%]`}>
        <ul 
          className="relative flex flex-col md:flex-row bg-white md:bg-transparent h-full z-2"
          >
          { !isLoggedIn && <li>
              <Link to="/users/join" 
                className="md:hidden flex bg-red-500 py-2 px-5 sm:px-8 md:px-10 uppercase items-center gap-2 text-white font-bold hover:bg-red-800 " 
                onClick={ () => {
                  coursesActive && setCoursesActive(false)
                  navbarActive && setNavbarActive(false)
                } }>
                <FileText />
                Apply
              </Link>
            </li> }
          <Link
            to="/find-professional"
            onClick={ () => {
              coursesActive && setCoursesActive(false)
              navbarActive && setNavbarActive(false)
            } }
            className='md:hidden rounded font-bold text-black px-5 sm:px-8 py-2 bg-gray-100 hover:bg-gray-200'
          > Find a professional </Link>
          { MenuItems.map( menu => {
              let path = "/" + menu.title.toLowerCase().split(' ').join('-')
              if(menu.title.toLocaleLowerCase() === 'home') path=''
              return (
                <li 
                  key={ menu.title } 
                  className="md:relative"
                  >

                  { !menu.list && <NavLink 
                    to={ path } 
                    className="block text-gray-900 py-2 md:py-0 px-5 sm:px-8 md:px-3 font-semibold hover:bg-gray-200 w-full whitespace-nowrap" 
                    onClick={ () => navbarActive && setNavbarActive(false) }
                    > { menu.title } </NavLink> }

                  { menu.list && <span 
                        className=" text-gray-900 font-semibold flex items-center justify-between cursor-pointer py-2 md:py-0 px-5 sm:px-8 md:px-3 w-full hover:bg-gray-200 capitalize"
                        onClick={ () => setCoursesActive(prev => !prev) }
                        > { menu.title }
                        <ChevronRight 
                          className="md:rotate-[90deg]"/>
                      </span> 
                  }

                  {
                    menu.list && <ul
                        className={`sub-nav bg-white md:top-[100%] md:max-h-[60vh] md:border-t-2
                          ${ coursesActive ? 'absolute top-0 z-1 h-full w-full md:h-fit overflow-y-scroll md:overflow-[unset] md:w-fit' : 'hidden' }
                          `}
                        onClick={ () => setCoursesActive(false) }
                        >
                        <span 
                          className="sticky cursor-pointer top-0 z-1 bg-white flex items-center font-4xl font-bold capitalize py-2 px-5 border-b-1 border-gray-500 md:hidden">
                          <ChevronLeft />
                          go back
                        </span>
                        {
                          menu.list.map((list, listIndex) => {
                            path = "/" + menu.title.toLowerCase().split(' ').join('_') + "/" + list.course.toLowerCase().split(' ').join('_')

                            return (
                              <li
                                key={ listIndex }
                                >
                                { listIndex === 0 && <Link 
                                    to="/courses"
                                      className="md:pl-5 md:pr-10 py-2 px-5 w-[500px] font-semibold bg-red-500 text-white hidden md:block hover:bg-gray-950 hover:text-white" 
                                      onClick={ () => {
                                        coursesActive && setCoursesActive(false)
                                        coursesActive && setNavbarActive(false)
                                      } }
                                    > View all courses
                                  </Link> }
                                <NavLink
                                  to={path}
                                  className={ `block md:pl-5 md:pr-10 py-2 px-5 w-full  md:w-[500px] hover:bg-gray-950 hover:!text-white capitalize after:!border-none !font-normal` }
                                  onClick={ () => {
                                    coursesActive && setCoursesActive(false)
                                    navbarActive && setNavbarActive(false)
                                  } }
                                  > { list.course }
                                </NavLink>
                              </li>
                            )
                          })
                        }
                      </ul>
                  }
                </li>
              )
            }) }
        </ul>
        <div className={`${ coursesActive ? '' : navbarActive ? '' : 'hidden' } h-[100vh] z-1 w-[300vw] 
            md:!fixed md:top-[100%] md:left-0 md:right-0 md:translate-x-[-50%] md:bg-gray-950/20 bg-gray-950/60`
          }
          onClick={ () => {
                            setCoursesActive(false)
                            setNavbarActive(false)
                          } }
          ></div>       
      </nav>
  )
}