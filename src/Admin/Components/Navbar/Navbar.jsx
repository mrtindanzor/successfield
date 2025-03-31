import useAdminNavigation from '../../Contexts/NavigationContext/NavigationContext'
import styles from './Navbar.module.css'

export default function Navbar(){
  const { NavItems, setCurrentTab } = useAdminNavigation()

  return (
    <nav className={ styles.navbar }>
      {
        NavItems.map(( item, index ) => {
          return <span key={ item.title } className={ styles.title } onClick={ () => setCurrentTab(index) } > { item.title } </span>
        })
      }
    </nav>
  )
}