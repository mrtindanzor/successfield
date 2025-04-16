import useAdminNavigation from '../../Contexts/NavigationContext/NavigationContext'

export default function Navbar(){
  const { NavItems, currentTab, setCurrentTab } = useAdminNavigation()

  return (
    <nav className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2 mx-auto w-[98vw] pt-2">
      {
        NavItems.map(( item, index ) => {
          return <span key={ item.title } className={ `bg-green-500 rounded block px-3 py-1 cursor-pointer text-white text-xl ${currentTab === index ? '!bg-green-800' : ''}` } onClick={ () => setCurrentTab(index) } > { item.title } </span>
        })
      }
    </nav>
  )
}