import { useEffect, useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import useCourses from "../Contexts/CoursesContext";
import { ChevronLeft, ChevronRight, FileText, X } from "lucide-react";
import useAuth from "../Contexts/AuthenticationContext";

export function MenuButton({ navbarActive, setNavbarActive }){
  
  const toggleWrapperClasses="flex items-center h-full *:first:w-10 *:first:h-10 text-white flex *:p-1 cursor-pointer lg:hidden *:first:items-center *:first:justify-center *:first:rounded"

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
        className={`${ !navbarActive && 'translate-x-[-100vw] lg:translate-0' } transition lg:transition-none duration-300 absolute lg:relative left-0 lg:left-0 top-[3.75rem] md:top-[4.5rem] border-t-2 border-t-gray-200 lg:border-none w-full lg:top-0 h-[calc(100vh-3.5rem)] lg:h-fit grid grid-cols-[80%_20%]`}>
        <ul 
          className="relative flex flex-col lg:flex-row list-none bg-white lg:bg-transparent h-full lg:w-fit w-full !z-[8888] lg:max-w-fit"
          >
          { 
            !isLoggedIn && <li>
              <Link to="/users/join" 
              className="lg:hidden flex bg-red-500 py-2 px-5 uppercase items-center gap-2 text-white font-bold hover:bg-red-700 " 
              onClick={ () => {
                            coursesActive && setCoursesActive(false)
                            navbarActive && setNavbarActive(false)
                          } }>
                <FileText />
                Apply
              </Link>
            </li> 
          }
          {
          MenuItems.map(( menu, index ) => {
            let path = "/" + menu.title.toLowerCase().split(' ').join('-')
            if(menu.title.toLocaleLowerCase() === 'home') path=''
            return (
              <li 
                key={ menu.title } 
                className="lg:relative"
                >

                { !menu.list && <NavLink 
                  to={ path } 
                  className="block text-gray-900 py-2 px-5 sm:px-2 border-b-1 font-semibold border-b-gray-100 lg:border-2 lg:border-transparent lg:hover:rounded lg:hover:border-gray-300 hover:bg-gray-200 w-full whitespace-nowrap" 
                  onClick={ () => navbarActive && setNavbarActive(false) }
                  > { menu.title } </NavLink> }

                { menu.list && <span 
                      className=" text-gray-900 font-semibold flex items-center justify-between cursor-pointer py-2 px-5 sm:px-2 border-b-1 border-b-gray-100 lg:border-2 lg:border-transparent lg:hover:rounded  w-full lg:hover:border-gray-300 hover:bg-gray-200 capitalize"
                      onClick={ () => !coursesActive && setCoursesActive(prev => !prev) }
                      > { menu.title }
                      <ChevronRight 
                        className="lg:rotate-[90deg]"/>
                    </span> 
                }

                {
                  menu.list && <ul
                      className={`sub-nav lg:absolute lg:top-[100%] bg-white
                        cursor-pointer pb-10 lg:pb-[unset] lg:pd-[unset]
                        lg:max-h-[60vh] lg:overflow-hidden lg:overflow-y-auto
                        ${ coursesActive ? 'absolute top-0 z-1 h-full w-full lg:h-fit overflow-y-scroll lg:overflow-[unset] lg:w-fit' : 'hidden' }
                         `}
                      onClick={ () => setCoursesActive(false) }
                      >
                      <span 
                        className="sticky top-0 z-1 bg-white flex items-center font-4xl font-bold capitalize py-2 px-5 border-b-1 border-gray-500 lg:hidden">
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
                                    className="lg:pl-5 lg:pr-10 py-2 px-5 w-[500px] font-semibold bg-red-500 text-white hidden lg:block hover:bg-gray-950 hover:text-white" 
                                    onClick={ () => {
                                      coursesActive && setCoursesActive(false)
                                      coursesActive && setNavbarActive(false)
                                    } }
                                  > View all courses
                                </Link> }
                              <NavLink
                                to={path}
                                className={ `block lg:pl-5 lg:pr-10 py-2 px-5 w-full  lg:w-[500px] hover:bg-gray-950 hover:!text-white capitalize after:!border-none !font-normal` }
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
          })
        }
        </ul>
        <div className={`${ coursesActive ? '' : 'lg:hidden' } h-[100vh] !z-2 w-full lg:w-[300vw] lg:!fixed lg:left-0 lg:right-0 lg:translate-x-[-50%] lg:bg-gray-900/40 lg:top-[100%] bg-gray-900/60`}
          onClick={ () => {
                            coursesActive && setCoursesActive(false)
                            navbarActive && setNavbarActive(false)
                          } }
          ></div>       
      </nav>
  )
}