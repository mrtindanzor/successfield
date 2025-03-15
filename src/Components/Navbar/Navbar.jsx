import icons from "../../Icons/icons";
import styles from "./Navbar.module.css";
import useAuthentication from "../../Hooks/useAuthentication/useAuthentication";
import useCourses from "../../Hooks/useCourses/useCourses";
import { Link, NavLink } from "react-router-dom";
import { capitalize } from "./../../core";

const arrowRight = icons.chevronRight(styles.arrowRight, 'More')
const arrowLeft = icons.chevronLeft(styles.arrowLeft, 'Back')
const arrowDown = icons.chevronDown(styles.arrowDown, 'More')
const menuBtn = icons.menu(styles.menuBtn, 'Menu')
const closeBtn = icons.close(styles.closeBtn, 'Close')
const signUpBtn = icons.signUp(styles.signUpBtn, 'Sign Up' )

document.body.addEventListener('click', function(e){
  const deskMenuButton = document.querySelector('.desktop-menu-button')
  const desktopNav = document.querySelector('.desktop-nav')
  const subList = desktopNav.querySelectorAll('ul ul')
  const deskMenuButtonDisplay = getComputedStyle(deskMenuButton).display
  if(deskMenuButtonDisplay !== 'none'){
    mobileMenuToggle('hide-all')
    if(e.target !== deskMenuButton && !deskMenuButton.contains(e.target) && e.target !== desktopNav && !desktopNav.contains(e.target)) {
      desktopNav.style.display = 'none'
      for(const list of subList){
        list.style.display = 'none'
      }
    }
    return
  }
  const nav = document.querySelector('nav.mobile-nav')
  const menuButton = document.querySelector('.menu-button')
  const closeButton = document.querySelector('.close-menu-btn')
  const mainMenu = document.querySelector('.main-menu')
  if(!nav.contains(e.target) && e.target !== nav && e.target !== menuButton && !menuButton.contains(e.target)){
    (mainMenu.style.transform = 'translateX(0)'),(nav.style.transform = 'translateX(calc(-100% - 50px))')
    
    if(closeButton.style.display !== 'none') (closeButton.style.display = 'none'), (menuButton.style.display = 'block')
    } 
})

function mobileMenuToggle(option){
  const closeButton = document.querySelector('.close-menu-btn')
  const menuButton = document.querySelector('.menu-button')
  const mainMenu = document.querySelector('.mobile-nav .main-menu')
  const nav = document.querySelector('nav.mobile-nav')
  
  if(option === 'open'){
    nav.style.transform = 'translateX(0)'
    menuButton.style.display = 'none'
    closeButton.style.display = 'block'
  }
  if(option === 'hide-all'){
    mainMenu.style.transform = 'translateX(0)'
    closeButton.style.display = 'none'
    menuButton.style.display = 'block'
    mainMenu.style.transform = 'translateX(0)'
    nav.style.transform = 'translateX(calc(-100% - 50px))'
    nav.scrollTo({ top: 0, behavior: 'smooth'})
  }
  if(option === 'show-subList'){
    mainMenu.style.transform = 'translateX(calc(-100% - 40px))'
    menuButton.style.display = 'none'
    closeButton.style.display = 'block'
  }
  if(option === 'show-mainList'){
    mainMenu.style.transform = 'translateX(0)'
  }
}

function autoHideSubLists(e){
  const mainMenu = e.target.parentElement.parentElement
  const subLists = mainMenu.querySelectorAll('ul')
  
  for(const subList of subLists){
    subList.style.display = 'none'
  }
}

function autoHideMainList(version = ''){
  if(version === 'mobile') return mobileMenuToggle('hide-all')

  const desktopNav = document.querySelector('.desktop-nav')
  const desktopSubLists = desktopNav.querySelectorAll('ul ul')

  desktopNav.style.display = 'none'
  for(const subList of desktopSubLists){
    subList.style.display = 'none'
  }
  
}

function handleMenuHover(e, option = 'main'){
  const desktopNav = document.querySelector('.desktop-nav')
  if(option === 'main'){
    desktopNav.style.display = 'flex'
  }
  if(option === 'sub'){
    const subList = e.target.nextElementSibling
    subList.style.display = 'flex'
  }
}

export function MenuButton(){

  return (
    <>
      <div className={styles.closeButton + ' close-menu-btn'} onClick={ (e) => mobileMenuToggle('hide-all') }>
          { closeBtn }
      </div>
    <div className={styles.menuButton + ' menu-button'} onClick={(e) => mobileMenuToggle('open')}>
      { menuBtn }
    </div>
    </>
  )
}

export function DeskMenuButton(){

  return (
    <h3 className={styles.deskMenuButton + ' desktop-menu-button'} onMouseOver={(e) => handleMenuHover(e)}>Explore { arrowDown } </h3>
  )
}

export default function Navbar(){
  const { isLoggedIn } = useAuthentication()
  const { coursesList } = useCourses()
  
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
      <nav className={styles.mobileNav + ' mobile-nav'}>
        {
          !isLoggedIn && <NavLink to='/users/join' className={styles.signUpLink} onClick={ () => autoHideMainList('mobile') } > { signUpBtn } Sign up</NavLink>
        }
        <ul className={styles.menuList + ' main-menu'}>
          {
            MenuItems.map((item, index) => {
              let linkPage = item.title.toLocaleLowerCase().trim().split(' ').join('-')
              if(item.title === 'Home') linkPage = ''
              const list = item.list ?? ''
              const subList = list && <ul className={styles.subList}>
                                        <span className={styles.subListBtn} onClick={(e) => mobileMenuToggle('show-mainList')}> { arrowLeft }{ capitalize(item.title) } </span>
                                        {
                                          list.map((course, i) => {
                                            const subListLink = course.course.toLowerCase().trim().split(' ').join('-')
                                            return <li key={i} className={styles.subListItem} onClick={ () => autoHideMainList('mobile') } > <NavLink to={'courses/'+subListLink}> { capitalize(course.course) } </NavLink> </li>
                                          })
                                        }
                                      </ul>
              const newLink = list ? 
                                <li key={index}>
                                  <span className={styles.subListBtn} onClick={(e) => mobileMenuToggle('show-subList')}> { capitalize(item.title) }{ arrowRight } </span>
                                  { subList }
                                </li>
                                :
                                <li key={index} className={styles.menuItem} onClick={ () => autoHideMainList('mobile') } > <NavLink to={'/'+linkPage}> { capitalize(item.title) } </NavLink> </li>

              return newLink
            })
          }
        </ul>
      </nav>
      <nav className={styles.desktopNav + ' desktop-nav'}>
        <ul className={styles.menuList + ' main-menu'}>
          {
            MenuItems.map((item, index) => {
              let linkPage = item.title.toLocaleLowerCase().trim().split(' ').join('-')
              if(item.title === 'Home') linkPage = ''
              const list = item.list ?? ''
              const subList = list && <ul className={styles.subList}>
                                        {
                                          list.map((course, i) => {
                                            if(i === 4) return <li key={ i } className={ styles.subListItem } onClick={ autoHideMainList }> <Link to='courses'> See more ... </Link> </li>
                                            if(i > 4) return
                                            const subListLink = course.course.toLowerCase().trim().split(' ').join('-')
                                            return <li key={i} className={styles.subListItem}  onClick={ autoHideMainList }> <NavLink to={'courses/' + subListLink}> { capitalize(course.course) } </NavLink> </li>
                                          })
                                        }
                                      </ul>
              const newLink = list ? 
                                <li key={index} className={styles.subListContainer}>
                                  <span className={styles.subListBtn} onMouseOver={(e) => handleMenuHover(e, 'sub')}> { capitalize(item.title) }{ arrowRight } </span>
                                  { subList }
                                </li>
                                :
                                <li key={index} className={styles.menuItem}  onMouseOver={(e) => autoHideSubLists(e)} onClick={ autoHideMainList }> <NavLink to={ '/' + linkPage }> { capitalize(item.title) } </NavLink> </li>

              return newLink
            })
          }
        </ul>
      </nav>
    </>
  )
}