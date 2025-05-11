import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import useCourses from "../Contexts/CoursesContext";
import { capitalize } from "../core";
import { ChevronDown, ChevronLeft, ChevronRight, FileText, Menu, X } from "lucide-react";
import useAuth from "../Contexts/AuthenticationContext";

export function mobileMenuToggle(option){
  const body = document.body
  const navList = document.querySelector('.sub-nav')
  const nav = document.querySelector('nav')
  const mobileNavToggleOpen = document.querySelector('.mobile-open-btn')
  const mobileNavToggleClose = document.querySelector('.mobile-close-btn')

  switch(option){
    case 'open':
        nav.classList.remove('translate-x-[-100%]')
        nav.classList.remove('md:hidden')
        mobileNavToggleOpen.classList.add('!hidden')
        mobileNavToggleClose.classList.remove('!hidden')
        body.classList.add('overflow-y-hidden')
        body.classList.add('md:overflow-y-scroll')
      break

    case 'hide-all':
        mobileNavToggleOpen.classList.remove('!hidden')
        mobileNavToggleClose.classList.add('!hidden')
        nav.classList.add('md:hidden')
        nav.classList.add('translate-x-[-100%]')
        navList.classList.add('translate-x-[-100%-10px]')
        navList.classList.add('md:hidden')
        navList.scrollTo({ top: 0, behavior: 'smooth'})
        body.classList.remove('overflow-y-hidden')
        body.classList.remove('md:overflow-y-auto')
      break

    case 'show-subList':
        navList.classList.remove('md:hidden')
        navList.classList.remove('translate-x-[-100%-10px]')
        navList.classList.add('md:translate-x-[1px]')
        mobileNavToggleClose.classList.add('flex')
        mobileNavToggleOpen.classList.add('hidden')
        mobileNavToggleOpen.classList.remove('flex')
        mobileNavToggleClose.classList.remove('hidden')
      break

    case 'show-mainList':
        navList.classList.add('translate-x-[-100%-10px]')
        navList.classList.add('md:hidden')
      break
  }
}

export function handleMenuHover(option = 'main'){
  const navList = document.querySelector('.sub-nav')
  const nav = document.querySelector('nav')

  if(option === 'main') nav.classList.remove('md:hidden')
  if(option === 'sub') navList.classList.remove('md:hidden')
}

export function MenuButton(){
  const toggleWrapperClasses="*:w-10 *:h-10 text-white flex *:p-1 cursor-pointer *:flex md:hidden *:items-center *:justify-center *:rounded"
  const toggleOpenClasses = "mobile-open-btn bg-black"
  const toggleCloseClasses="mobile-close-btn bg-red-600 !hidden"

  return (
    <>
      <div className={ toggleWrapperClasses }>
        <X  className={ toggleCloseClasses } onClick={ () => mobileMenuToggle('hide-all') }/>
        <Menu  className={ toggleOpenClasses } onClick={() => mobileMenuToggle('open')}/>
      </div>
    </>
  )
}


export function DeskMenuButton(){

  return (
    <h3 className=" desktop-nav-btn justify-self-start md:flex items-center hidden " onMouseOver={ () => handleMenuHover() }>
      Explore
      <ChevronDown />
    </h3>
  )
}

export default function Navbar(){
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
    // {
    //   title: 'Accreditation'
    // },
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
    document.body.addEventListener('click', function(e){
      const desktopNavToggle = document.querySelector('.desktop-nav-btn')
      const mobileNavToggleOpen = document.querySelector('.mobile-open-btn')
      const nav = document.querySelector('nav')
      if(!nav.contains(e.target) && e.target !== desktopNavToggle && !desktopNavToggle.contains(e.target) && e.target !== mobileNavToggleOpen && !mobileNavToggleOpen.contains(e.target)){
        mobileMenuToggle('hide-all')
      }
        
    })

  }, [])
  
  return (
      <nav className=" translate-x-[-100%] transition md:transition-none duration-300 ease-linear md:translate-[unset] bg-white z-999 fixed top-[3.5rem] left-0 md:hidden md:ml-[20%] h-[calc(100vh-3.5rem)] list-none md:h-auto w-[98vw] md:w-[200px] border-1 border-gray-200  ">
        { 
          !isLoggedIn && <li>
            <Link to="/users/join" className=" md:hidden flex bg-red-500 p-3 uppercase items-center gap-2 text-white font-bold hover:bg-red-700 " onClick={ () => mobileMenuToggle('hide-all') }> 
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
              <li key={ menu.title + index } className=" relative ">
                { !menu.list && <NavLink to={ path } className=" block p-2 border-b-1 border-b-gray-100 hover:bg-green-400 hover:text-white w-[100%] " onClick={ () =>  mobileMenuToggle('hide-all') } > { capitalize( menu.title ) } </NavLink> }
                { menu.list && <span className=" flex items-center justify-between cursor-pointer p-2 border-b-1 border-b-gray-100 hover:bg-green-400 hover:text-white w-[100%] " onMouseOver={ () => handleMenuHover('sub') } onClick={ () => mobileMenuToggle('show-subList') }>
                                  { capitalize( menu.title ) }
                                  <ChevronRight />
                                </span> 
                }
                {
                  menu.list && <ul key={ Math.random() + Math.random() * Math.random() } className=" sub-nav translate-x-[-100%-10px] md:translate-0 overflow-y-scroll transition md:transition-none duration-300 ease-linear fixed top-[51px] md:absolute bg-white py-3 md:p-0 z-1000 left-0 md:left-[calc(100%+2px)] md:top-0 w-[98vw]  md:w-[calc(100%+20px)] h-[calc(100vh-3.5rem)] md:h-[fit-content] md:hidden ">
                    <span key={ Math.random() + Math.random() * Math.random() + Math.random() } className=" w-[100%] h-7 flex items-center md:hidden cursor-pointer text-xl py-5 bg-white border-b-1 border-b-gray-300 " onClick={ () => mobileMenuToggle('show-mainList') }>
                      <ChevronLeft />
                      { menu.title }
                    </span>
                                {
                                  menu.list.map((list, listIndex) => {
                                    path = "/" + menu.title.toLowerCase().split(' ').join('_') + "/" + list.course.toLowerCase().split(' ').join('_')
                                    let classes = "block p-2 border-b-1 border-b-gray-100 hover:bg-green-400 hover:text-white w-[100%] "
                                    if(listIndex > 2) classes += " md:hidden "

                                    return (
                                      <>
                                        
                                        <NavLink key={ list.course } to={path} className={ classes } onClick={ () =>  mobileMenuToggle('hide-all') }>
                                      { capitalize( list.course ) }
                                        </NavLink>

                                        { listIndex === 3 && <Link key={ 'see more' + index } to="/courses" className=" hidden md:block p-2 border-b-1 border-b-gray-100 hover:bg-green-400 hover:text-white w-[100%] " 
                                         onClick={ () =>  mobileMenuToggle('hide-all') }> View all courses </Link> }
                                      </>
                                    )
                                  })
                                }
                                </ul>
                }
              </li>
            )
          })
        }
      </nav>
  )
}