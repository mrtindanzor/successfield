import icons from "../../Icons/icons";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const switchRight = icons.chevronRight(styles.switchRight, 'More')
const switchLeft = icons.chevronLeft(styles.switchLeft, 'Back')

const MenuItems = [
  {
    title: 'Home',
  },
  {
    title: 'Courses',
    list: [
      {
        course: 'Diploma'
      },
      {
        course: 'Nursing'
      }
    ]
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

export default function Navbar(){

  return (
    <nav>
      <ul>
        {
          MenuItems.map((item, index) => {
            let linkPage = item.title.toLocaleLowerCase().trim().split(' ').join('-')
            if(item.title === 'Home') linkPage = ''
            console.log(linkPage)
            const list = item.list ?? ''
            const subList = list && <ul>
                                      {
                                        list.map((course, i) => {
                                          const subListLink = course.course.toLowerCase().trim().split(' ').join('-')
                                          return <li key={i} className={styles.subListItem} > <NavLink to={'courses/'+subListLink}> { course.course } </NavLink> </li>
                                        })
                                      }
                                    </ul>
            const newLink = list ? 
                              <li key={index} className={styles.subList} >
                                <span className={styles.subListBtn} > { item.title } </span>
                                { subList }
                              </li>
                              :
                              <li key={index} className={styles.menuItem}> <NavLink to={'/'+linkPage}> { item.title } </NavLink> </li>

            return newLink
          })
        }
      </ul>
    </nav>
  )
}