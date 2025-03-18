import icons from "../../Icons/icons";
import styles from "./Navbar.module.css";
import { createContext, useContext, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuthentication/useAuthentication";
import { useCourses } from "../../Hooks/useCourses/useCourses";
import { capitalize } from "./../../core";

const arrowRight = icons.chevronRight(styles.arrowRight, 'More')
const arrowLeft = icons.chevronLeft(styles.arrowLeft, 'Back')
const arrowDown = icons.chevronDown(styles.arrowDown, 'More')
const menuBtn = icons.menu(styles.menuBtn, 'Menu')
const closeBtn = icons.close(styles.closeBtn, 'Close')
const signUpBtn = icons.signUp(styles.signUpBtn, 'Sign Up' )

const MenuBtnsContext = createContext()
export function MenuBtnsProvider({ children }){
  const mobileCloseBtnRef = useRef()
  const mobileMenuBtnRef = useRef()
  const desktopMenuBtnRef = useRef()
  const mobileNavRef = useRef()
  const mobileMenuRef = useRef()
  const mobileSubListRef = useRef()
  const desktopNavRef = useRef()
  const desktopMenuRef = useRef()
  const desktopSubListRef = useRef()

  function autoHideDesktopSubList (){
    desktopSubListRef.current.style.display = 'none'
  }
  
  function autoHideMainList(version = ''){
    if(version === 'mobile') return mobileMenuToggle('hide-all')
  
    desktopNavRef.current.style.display = 'none'
    desktopSubListRef.current.style.display = 'none'
  }

  document.body.addEventListener('click', function(e){
    const deskMenuButtonDisplay = getComputedStyle(desktopMenuBtnRef.current).display
    if(deskMenuButtonDisplay !== 'none'){
      mobileMenuToggle('hide-all')
      if(e.target !== desktopMenuBtnRef.current && !desktopMenuBtnRef.current.contains(e.target) && e.target !== desktopNavRef.current && !desktopNavRef.current.contains(e.target)) {
        desktopNavRef.current.style.display = 'none'
        desktopSubListRef.current.style.display = 'none'
      }
      return
    }
    
    if(!mobileNavRef.current.contains(e.target) && e.target !== mobileNavRef.current && e.target !== mobileMenuBtnRef.current && !mobileMenuBtnRef.current.contains(e.target)){
      mobileMenuRef.current.style.transform = 'translateX(0)'
      mobileNavRef.current.style.transform = 'translateX(calc(-100% - 50px))'

      if(mobileCloseBtnRef.current.style.display !== 'none'){
        mobileCloseBtnRef.current.style.display = 'none'
        mobileMenuBtnRef.current.style.display = 'block'
      }
    }
      
  })
  
  function mobileMenuToggle(option){
    switch(option){
      case 'open':
          mobileNavRef.current.style.transform = 'translateX(0)'
          mobileMenuBtnRef.current.style.display = 'none'
          mobileCloseBtnRef.current.style.display = 'block'
        break
  
      case 'hide-all':
          mobileMenuRef.current.style.transform = 'translateX(0)'
          mobileCloseBtnRef.current.style.display = 'none'
          mobileMenuBtnRef.current.style.display = 'block'
          mobileNavRef.current.style.transform = 'translateX(calc(-100% - 50px))'
          mobileNavRef.current.scrollTo({ top: 0, behavior: 'smooth'})
        break
  
      case 'show-subList':
          mobileMenuRef.current.style.transform = 'translateX(calc(-100% - 40px))'
          mobileMenuBtnRef.current.style.display = 'none'
          mobileCloseBtnRef.current.style.display = 'block'
        break
  
      case 'show-mainList':
          mobileMenuRef.current.style.transform = 'translateX(0)'
        break
    }
  }
  
  function handleMenuHover(option = 'main'){
    if(option === 'main') desktopNavRef.current.style.display = 'flex'
    if(option === 'sub') desktopSubListRef.current.style.display = 'flex'
  }

  return (
          <MenuBtnsContext.Provider value={ { mobileCloseBtnRef, mobileMenuBtnRef, desktopMenuBtnRef, mobileNavRef, mobileMenuRef, mobileSubListRef, desktopNavRef, desktopMenuRef, desktopSubListRef, mobileMenuToggle, handleMenuHover, autoHideDesktopSubList, autoHideMainList } }>
            { children }
          </MenuBtnsContext.Provider>
    )
}
export function useMenuBtns(){ return useContext(MenuBtnsContext) }

export function MenuButton(){
  const { mobileCloseBtnRef, mobileMenuBtnRef, mobileMenuToggle } = useMenuBtns()

  return (
    <>
      <div className={ styles.closeButton } ref={ mobileCloseBtnRef } onClick={ () => mobileMenuToggle('hide-all') }>
            { closeBtn }
        </div>
      <div className={ styles.menuButton } ref={ mobileMenuBtnRef } onClick={() => mobileMenuToggle('open')}>
        { menuBtn }
      </div>
    </>
  )
}


export function DeskMenuButton(){
  const { desktopMenuBtnRef, handleMenuHover } = useMenuBtns()

  return (
    <h3 className={ styles.deskMenuButton } ref={ desktopMenuBtnRef } onMouseOver={ () => handleMenuHover() }>Explore { arrowDown } </h3>
  )
}

export default function Navbar(){
  const { isLoggedIn } = useAuth()
  const { coursesList } = useCourses()
  const { mobileNavRef, mobileMenuRef, mobileSubListRef, desktopNavRef, desktopMenuRef, desktopSubListRef, mobileMenuToggle, handleMenuHover, autoHideDesktopSubList, autoHideMainList } = useMenuBtns()
  
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
    <>
      <nav className={ styles.mobileNav } ref={ mobileNavRef }>
        {
          !isLoggedIn && <NavLink to='/users/join' className={ styles.signUpLink } onClick={ () => autoHideMainList('mobile') } > { signUpBtn } Sign up</NavLink>
        }
        <ul className={ styles.menuList } ref={ mobileMenuRef }>
          {
            MenuItems.map((item, index) => {
              let linkPage = item.title.toLocaleLowerCase().trim().split(' ').join('-')
              if(item.title === 'Home') linkPage = ''
              const list = item.list ?? ''
              const subList = list && <ul className={ styles.subList } ref={ mobileSubListRef }>
                                        <span className={ styles.subListBtn } onClick={ () => mobileMenuToggle('show-mainList') }> { arrowLeft }{ capitalize(item.title) } </span>
                                        {
                                          list.map((course, i) => {
                                            const subListLink = course.course.toLowerCase().trim().split(' ').join('-')
                                            return <li key={ i } className={ styles.subListItem } onClick={ () => autoHideMainList('mobile') } > <NavLink to={ 'courses/' + subListLink }> { capitalize(course.course) } </NavLink> </li>
                                          })
                                        }
                                      </ul>
              const newLink = list ? 
                                <li key={ index }>
                                  <span className={ styles.subListBtn } onClick={ () => mobileMenuToggle('show-subList') }> { capitalize(item.title) }{ arrowRight } </span>
                                  { coursesList && subList }
                                </li>
                                :
                                <li key={ index } className={ styles.menuItem } onClick={ () => autoHideMainList('mobile') } > <NavLink to={ '/' + linkPage }> { capitalize(item.title) } </NavLink> </li>

              return newLink
            })
          }
        </ul>
      </nav>
      <nav className={ styles.desktopNav } ref={ desktopNavRef }>
        <ul className={ styles.menuList } ref={ desktopMenuRef }>
          {
            MenuItems.map((item, index) => {
              let linkPage = item.title.toLocaleLowerCase().trim().split(' ').join('-')
              if(item.title === 'Home') linkPage = ''
              const list = item.list ?? ''
              const subList = list && <ul className={ styles.subList } ref={ desktopSubListRef }>
                                        {
                                          list.map((course, i) => {
                                            if(i === 4) return <li key={ i } className={ styles.subListItem } onClick={ autoHideMainList }> <Link to='courses'> See more ... </Link> </li>
                                            if(i > 4) return
                                            const subListLink = course.course.toLowerCase().trim().split(' ').join('-')
                                            return <li key={ i } className={ styles.subListItem }  onClick={ autoHideMainList }> <NavLink to={ 'courses/' + subListLink }> { capitalize(course.course) } </NavLink> </li>
                                          })
                                        }
                                      </ul>
              const newLink = list ? 
                                <li key={ index } className={ styles.subListContainer }>
                                  <span className={ styles.subListBtn } onMouseOver={ () => handleMenuHover('sub') }> { capitalize(item.title) }{ arrowRight } </span>
                                  { subList }
                                </li>
                                :
                                <li key={ index } className={ styles.menuItem }  onMouseOver={ autoHideDesktopSubList } onClick={ autoHideMainList }> <NavLink to={ '/' + linkPage }> { capitalize(item.title) } </NavLink> </li>

              return newLink
            })
          }
        </ul>
      </nav>
    </>
  )
}