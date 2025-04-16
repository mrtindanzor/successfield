import useAdminNavigation from '../../Contexts/NavigationContext/NavigationContext'

export default function Details(){
  const { tabDetails } = useAdminNavigation()

  return tabDetails
}