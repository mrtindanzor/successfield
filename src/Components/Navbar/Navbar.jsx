import { createContext, useContext, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import useCourses from "./../../Contexts/CourseContext/CoursesContext";
import { capitalize } from "./../../core";
import { ChevronDown, ChevronLeft, ChevronRight, Menu, UserPlus, X } from "lucide-react";
import useAuth from "../../Contexts/AuthenticationContext/AuthenticationContext";

const MenuBtnsContext = createContext()
export function MenuBtnsProvider({ children }){
  const nav = useRef()
  const navList = useRef()
  const mobileCloseBtnRef = useRef()
  const mobileMenuBtnRef = useRef()
  const desktopMenuBtnRef = useRef()

  document.body.addEventListener('click', function(e){
    
    if(!nav.current.contains(e.target) && e.target !== desktopMenuBtnRef.current && !desktopMenuBtnRef.current.contains(e.target) && e.target !== mobileMenuBtnRef.current && !mobileMenuBtnRef.current.contains(e.target)){
      mobileMenuToggle('hide-all')
    }
      
  })
  
  function mobileMenuToggle(option){
    const body = document.body

    switch(option){
      case 'open':
          nav.current.classList.remove('translate-x-[-100%]')
          nav.current.classList.remove('md:hidden')
          mobileMenuBtnRef.current.classList.add('hidden')
          mobileMenuBtnRef.current.classList.remove('flex')
          mobileCloseBtnRef.current.classList.add('flex')
          mobileCloseBtnRef.current.classList.remove('hidden')
          body.classList.add('overflow-y-hidden')
          body.classList.add('md:overflow-y-scroll')
        break
  
      case 'hide-all':
          mobileMenuBtnRef.current.classList.add('flex')
          mobileMenuBtnRef.current.classList.remove('hidden')
          mobileCloseBtnRef.current.classList.add('hidden')
          mobileCloseBtnRef.current.classList.remove('flex')
          nav.current.classList.add('md:hidden')
          nav.current.classList.add('translate-x-[-100%]')
          navList.current.classList.add('translate-x-[-100%-10px]')
          navList.current.classList.add('md:hidden')
          navList.current.scrollTo({ top: 0, behavior: 'smooth'})
          body.classList.remove('overflow-y-hidden')
          body.classList.remove('md:overflow-y-auto')
        break
  
      case 'show-subList':
          navList.current.classList.remove('md:hidden')
          navList.current.classList.remove('translate-x-[-100%-10px]')
          navList.current.classList.add('md:translate-x-[1px]')
          mobileCloseBtnRef.current.classList.add('flex')
          mobileMenuBtnRef.current.classList.add('hidden')
          mobileMenuBtnRef.current.classList.remove('flex')
          mobileCloseBtnRef.current.classList.remove('hidden')
        break
  
      case 'show-mainList':
          navList.current.classList.add('translate-x-[-100%-10px]')
          navList.current.classList.add('md:hidden')
        break
    }
  }
  
  function handleMenuHover(option = 'main'){
    if(option === 'main') nav.current.classList.remove('md:hidden')
    if(option === 'sub') navList.current.classList.remove('md:hidden')
  }

  return (
          <MenuBtnsContext.Provider value={ { nav, navList, mobileCloseBtnRef, mobileMenuBtnRef, desktopMenuBtnRef, mobileMenuToggle, handleMenuHover } }>
            { children }
          </MenuBtnsContext.Provider>
    )
}
export function useMenuBtns(){ return useContext(MenuBtnsContext) }

export function MenuButton(){
  const { mobileCloseBtnRef, mobileMenuBtnRef, mobileMenuToggle } = useMenuBtns()

  return (
    <>
      <div className=" w-10 h-10 text-red-600 hidden md:hidden border-1 border-black items-center justify-center cursor-pointer " ref={ mobileCloseBtnRef } onClick={ () => mobileMenuToggle('hide-all') }>
        <X />
      </div>
      <div className=" w-10 h-10 text-black md:hidden flex items-center cursor-pointer " ref={ mobileMenuBtnRef } onClick={() => mobileMenuToggle('open')}>
        <Menu />
      </div>
    </>
  )
}


export function DeskMenuButton(){
  const { desktopMenuBtnRef, handleMenuHover } = useMenuBtns()

  return (
    <h3 className=" justify-self-start md:flex items-center hidden " ref={ desktopMenuBtnRef } onMouseOver={ () => handleMenuHover() }>
      Explore
      <ChevronDown />
    </h3>
  )
}

export default function Navbar(){
  const { coursesList } = useCourses()
  const { isLoggedIn } = useAuth()
  const { nav, navList, handleMenuHover, mobileMenuToggle } = useMenuBtns()
  
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
      title: 'Accreditation'
    },
    {
      title: 'Training Partners'
    },
    {
      title: 'About us'
    },
    {
      title: 'Contact us'
    }
  ]
  
  return (
      <nav ref={ nav } className=" translate-x-[-100%] transition md:transition-none duration-300 ease-linear md:translate-[unset] bg-white z-999 fixed top-[3.5rem] left-0 md:hidden md:ml-[20%] h-[calc(100vh-3.5rem)] list-none md:h-auto w-[98vw] md:w-[200px] border-1 border-gray-200  ">
        { 
          !isLoggedIn && <li>
            <Link to="/users/join" className=" md:hidden flex bg-red-500 p-3 items-center gap-2 text-white font-bold hover:bg-red-700 " onClick={ () => mobileMenuToggle('hide-all') }> 
              <UserPlus />
              Sign up
            </Link>
          </li> 
        }
        {
          MenuItems.map(( menu, index ) => {
            let path = "/" + menu.title.toLowerCase().split(' ').join('-')
            if(menu.title.toLocaleLowerCase() === 'home') path=''
            return (
              <li key={ menu.title + index } className=" relative ">
                { !menu.list && <Link to={ path } className=" block p-2 border-b-1 border-b-gray-100 hover:bg-green-400 hover:text-white w-[100%] " onClick={ () =>  mobileMenuToggle('hide-all') } > { capitalize( menu.title ) } </Link> }
                { menu.list && <span className=" flex items-center justify-between cursor-pointer p-2 border-b-1 border-b-gray-100 hover:bg-green-400 hover:text-white w-[100%] " onMouseOver={ () => handleMenuHover('sub') } onClick={ () => mobileMenuToggle('show-subList') }>
                                  { capitalize( menu.title ) }
                                  <ChevronRight />
                                </span> 
                }
                {
                  menu.list && <ul ref={ navList } className=" translate-x-[-100%-10px] md:translate-0 overflow-y-scroll transition md:transition-none duration-300 ease-linear fixed top-[51px] md:absolute bg-white py-3 md:p-0 z-1000 left-0 md:left-[calc(100%+2px)] md:top-0 w-[98vw]  md:w-[calc(100%+20px)] h-[calc(100vh-3.5rem)] md:h-[fit-content] md:hidden ">
                    <span className=" w-[100%] h-7 flex items-center md:hidden cursor-pointer text-xl py-5 bg-white border-b-1 border-b-gray-300 " onClick={ () => mobileMenuToggle('show-mainList') }>
                      <ChevronLeft />
                      { menu.title }
                    </span>
                                {
                                  menu.list.map((list, listIndex) => {
                                    path = "/" + menu.title.toLowerCase().split(' ').join('-') + "/" + list.course.toLowerCase().split(' ').join('-')
                                    let classes = "block p-2 border-b-1 border-b-gray-100 hover:bg-green-400 hover:text-white w-[100%] "
                                    if(listIndex > 2) classes += " md:hidden "

                                    return (
                                      <>
                                        
                                        <Link key={ list.course } to={path} className={ classes } onClick={ () =>  mobileMenuToggle('hide-all') }>
                                      { capitalize( list.course ) }
                                        </Link>

                                        { listIndex === 3 && <Link to="/courses" className=" hidden md:block p-2 border-b-1 border-b-gray-100 hover:bg-green-400 hover:text-white w-[100%] "> View all courses </Link> }
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