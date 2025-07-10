import DashboardTemplate from './DashboardTemplate'
import MainList from '../MainList'
import { MoveLeft } from 'lucide-react'
import { Outlet, useLocation, useNavigate, useOutlet } from 'react-router-dom'
import { useCallback } from 'react'

export default function Dashboard_sub() {
  const hasChildren = useOutlet()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  
  const handlenavigation = useCallback(() => {
    const _l = pathname.split('/')
    const _s = _l.slice(0, _l.length - 1).join('/')
    navigate(_s)
  }, [pathname])

  return (
    <DashboardTemplate>
      <div
        className={`md:grid grid-cols-[auto_1fr] h-screen w-full overflow-x-hidden border-t-2 border-t-gray-500`}
      >
        <div
          className={`${ !hasChildren ? '!block':"" } md:bg-gray-300 md:px-1 hidden md:block`}
        >
          <MainList />
        </div>
        <div
          className=' pt-3 flex flex-col gap-3'
        >
          { hasChildren && <button
            onClick={ handlenavigation }
            className='flex gap-2 items-center relative left-2 rounded px-3 py-2 bg-gray-300 border-2 border-transparent hover:border-gray-800 cursor-pointer'
          >
            <MoveLeft />
            <span>Back</span>
          </button> }
          <Outlet />
        </div>
      </div>
    </DashboardTemplate>
  )
}
