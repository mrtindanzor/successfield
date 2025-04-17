import useAdminNavigation from '../../Contexts/NavigationContext/NavigationContext'

export default function Details(){
  const { currentTab } = useAdminNavigation()

  return currentTab
}