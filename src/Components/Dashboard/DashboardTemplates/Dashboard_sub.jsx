import DashboardTemplate from './DashboardTemplate'
import MainList from '../MainList'
import { MoveLeft } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

export default function Dashboard_sub({ children }) {
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
          className={`${ !children ? '!block':"" } md:border-r-2 hidden md:block`}
        >
          <MainList />
        </div>
        <div
          className='px-2 pt-3 flex flex-col gap-3'
        >
          { children && <button
            onClick={ handlenavigation }
            className='flex gap-2 items-center rounded px-3 py-2 bg-gray-300 border-2 border-transparent hover:border-gray-800 cursor-pointer'
          >
            <MoveLeft />
            <span>Back</span>
          </button> }
          { children }
        </div>
      </div>
    </DashboardTemplate>
  )
}
