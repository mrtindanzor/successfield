import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loaderStateSelector } from '../Slices/settingsSlice'

export default function PendingLoading(){
  const active = useSelector( loaderStateSelector )
  useEffect(() => {
    if(active) document.body.classList.add('overflow-hidden')
    if(!active) document.body.classList.remove('overflow-hidden')

    return () => { document.body.classList.remove('overflow-hidden') }
  }, [active])

  if(!active) return null

  return <Loading />
}

export function Loading(){

  return (
    <div 
      className="loader fixed top-23 md:top-22 right-0 z-[999] flex items-center justify-center gap-3 h-[calc(100vh-5.5rem)] w-[100vw] *:z-11">
      <div className="absolute inset-0 !z-10 bg-gray-950/70"></div>
      <div 
        className="w-4 bg-green-700 [animation-delay:_.3s] drop-shadow-[1px_1px_1px_gray] origin-bottom [animation:_slide_1.2s_infinite_linear] [-webkit-animation:_slide_1.2s_infinite_linear] filter-none">            
        </div>
      <div 
        className="w-4 bg-green-400 drop-shadow-[1px_1px_1px_gray] origin-bottom [animation:_slide_1.2s_infinite_linear] [-webkit-animation:_slide_1.2s_infinite_linear] filter-none">
        </div>
      <div 
        className="w-4 bg-green-500 [animation-delay:_.5s] drop-shadow-[1px_1px_1px_gray] origin-bottom [animation:_slide_1.2s_infinite_linear] [-webkit-animation:_slide_1.2s_infinite_linear] filter-none">
      </div>
  </div>
  )
}
