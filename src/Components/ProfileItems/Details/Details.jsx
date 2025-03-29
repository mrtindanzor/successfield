// REACT //
import { useEffect } from 'react';

// STYLES //
import styles from './Details.module.css';

// OTHERS //
import useProfileList from '../../../Contexts/ProfileContext/ListContext';

export default function Details(){
  const { activeMainList, activeSubList, mainListItems, setActiveSubList } = useProfileList()

  return (
    <>
      {
        activeSubList && mainListItems[activeMainList].list ? <div className={ styles.detailsList }>
                          { 
                            mainListItems[activeMainList].list[activeSubList].section
                          }
                        </div> : null
      }
    </>
  )
}