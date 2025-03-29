import { useEffect } from 'react'
import useProfileList from '../../../Contexts/ProfileContext/ListContext'
import styles from './MainList.module.css'

export default function MainList(){
  const { mainListItems, activeMainList, activeSubList, setActiveMainList, setActiveSubList, arrowRight, arrowLeft } = useProfileList()

  function handleBackBtn(){
    if(activeSubList) return setActiveSubList('')
    return setActiveMainList('')
  }
  
  return (
    <ul className={ styles.mainList }>
      { ( activeSubList || activeMainList) && <button onClick={ handleBackBtn }> { arrowLeft } </button> }
      {
        mainListItems.map((item, index) => {
          return <li key={ index } data-section={ index } onClick={ (e) => setActiveMainList(e.target.dataset.section) }> { item.title } { arrowRight } </li>
        })
      }
    </ul>
  )
}