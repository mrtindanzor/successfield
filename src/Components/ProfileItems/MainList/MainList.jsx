import { useEffect } from 'react'
import useProfileList from '../../../Contexts/ProfileContext/ListContext'
import styles from './MainList.module.css'

export default function MainList(){
  const { activeMainList, setActiveMainList, mainListItems, arrowRight } = useProfileList()
  
  return (
    <ul className={ styles.mainList }>
      {
        mainListItems.map((item, index) => {
          return <li key={ index } data-section={ index } onClick={ (e) => setActiveMainList(e.target.dataset.section) }> { item.title } { arrowRight } </li>
        })
      }
    </ul>
  )
}