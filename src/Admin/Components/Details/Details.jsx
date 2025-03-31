import useAdminNavigation from '../../Contexts/NavigationContext/NavigationContext'
import styles from './Details.module.css'

export default function Details(){
  const { tabDetails } = useAdminNavigation()

  return tabDetails
}