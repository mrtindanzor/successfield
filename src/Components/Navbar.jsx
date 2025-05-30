import { useEffect, useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import useCourses from "../Contexts/CoursesContext";
import { ChevronLeft, ChevronRight, FileText, X } from "lucide-react";
import useAuth from "../Contexts/AuthenticationContext";

export function MenuButton({ navbarActive, setNavbarActive }){
  
  const toggleWrapperClasses="*:first:w-10 *:first:h-10 text-white flex *:p-1 cursor-pointer md:hidden *:first:items-center *:first:justify-center *:first:rounded"

  return (
    <>
      <div className={ toggleWrapperClasses }>
        <X  
        className={`bg-red-600 ${ navbarActive ? 'flex' : 'hidden' }`}
        onClick={ () => setNavbarActive(false) } />
        <div  
          className={`w-10 gap-1.5 grid  ${ navbarActive ? 'hidden' : '' }`} 
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
    {
      title: 'Home',
    },
    {
      title: 'Courses',
      list: coursesList,
    },
    {
      title: 'Verify Certificate'
    },
    {
      title: 'Accreditations'
    },
    // {
    //   title: 'Training Partners'
    // },
    // {
    //   title: 'About us'
    // },
    // {
    //   title: 'Contact us'
    // }
  ]

  useEffect(() => {
    if(!navbarActive && coursesActive) setCoursesActive(false)
  }, [navbarActive])
  
  return (
      <nav 
        className={`${ !navbarActive && 'translate-x-[-100vw] md:translate-0' } transition md:transition-none duration-300 absolute md:relative left-0 md:left-0 top-[6rem] w-[100vw] md:top-0 h-[calc(100vh-3.5rem)] md:h-fit`}>
        <div className={`${ navbarActive || coursesActive && 'bg-gray-950/90 md:bg-transparent inset-0 absolute md:!fixed md:left-0 md:right-0 w-[300vw] md:translate-x-[-50%] h-[100vh] md:top-[100%] z-[-1] border-red-500' }`}
          onClick={ () => {
                            coursesActive && setCoursesActive(false)
                            navbarActive && setNavbarActive(false)
                          } }
          ></div>
        <ul 
          className="flex flex-col md:flex-row list-none !bg-white md:bg-transparent w-[calc(100vw-30px)] h-full md:w-fit max-w-[500px] !z-2 md:max-w-fit"
          >
          { 
            !isLoggedIn && <li>
              <Link to="/users/join" 
              className=" sm:hidden flex bg-red-500 py-2 px-5 uppercase items-center gap-2 text-white font-bold hover:bg-red-700 " 
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
                className="md:relative"
                >

                { !menu.list && <NavLink 
                  to={ path } 
                  className=" block  py-2 px-5 sm:px-2 border-b-1 border-b-gray-100 md:border-none hover:bg-green-400 hover:text-white w-[100%]
                  md:w-fit whitespace-nowrap" 
                  onClick={ () => navbarActive && setNavbarActive(false) }
                  > { menu.title } </NavLink> }

                { menu.list && <span 
                      className=" flex items-center justify-between cursor-pointer py-2 px-5 sm:px-2 border-b-1 border-b-gray-100 md:border-none hover:bg-green-400 hover:text-white w-[100%] capitalize"
                      onClick={ () => !coursesActive && setCoursesActive(prev => !prev) }
                      > { menu.title }
                      <ChevronRight 
                        className="md:rotate-[90deg]"/>
                    </span> 
                }

                {
                  menu.list && <ul key={ Math.random() + Math.random() * Math.random() } 
                      className={`sub-nav md:absolute md:top-[100%] bg-white [box-shadow:1px_1px_3px_black] cursor-pointer pb-10 md:pb-[unset] md:pd-[unset] ${ coursesActive ? 'absolute top-0 z-1 h-full w-[calc(100vw-30px)] md:h-fit overflow-y-scroll md:overflow-[unset] md:w-fit' : 'hidden' } `}
                      onClick={ () => setCoursesActive(false) }
                      >
                      <span key={ Math.random() + Math.random() * Math.random() + Math.random() } className="sticky top-0 z-1 bg-white flex items-center font-4xl font-bold capitalize py-2 px-5 border-b-1 border-gray-500 md:hidden">
                        <ChevronLeft />
                        go back
                      </span>
                      {
                        menu.list.map((list, listIndex) => {
                          path = "/" + menu.title.toLowerCase().split(' ').join('_') + "/" + list.course.toLowerCase().split(' ').join('_')

                          return (
                            <li
                              key={ list.course }
                              >
                              <NavLink
                                to={path}
                                className={ `block md:pl-5 md:pr-10 py-2 px-5 w-full md:w-[500px] hover:bg-gray-950 hover:!text-white capitalize ${ listIndex > 3 ? 'md:hidden': 'block' } }` }
                                onClick={ () => {
                                  coursesActive && setCoursesActive(false)
                                  navbarActive && setNavbarActive(false)
                                } }
                                > { list.course }
                              </NavLink>
                              <hr />
                              { listIndex === 3 && <Link 
                                  to="/courses"
                                    className="md:pl-5 md:pr-10 py-2 px-5 w-[500px] hidden md:block hover:bg-gray-950 hover:text-white" 
                                    onClick={ () => {
                                      coursesActive && setCoursesActive(false)
                                      coursesActive && setNavbarActive(false)
                                    } }
                                  > View all courses
                                </Link> }
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
        
        
      </nav>
  )
}