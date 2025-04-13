import { ChevronLeft, ChevronRight, Circle, CircleDot, DotIcon } from 'lucide-react'
import { useMemo, useState, useRef, useEffect } from 'react'

export default function SlideShowSection(){
  const [ activeSlide, setActiveSlide ] = useState(0)
  const intervalId = useRef()
  const images = useMemo(() => ['000015.jpg', '000016.jpg', '000017.jpg', '000018.jpg', '000019.jpg', '000020.jpg', '000021.jpg', '000022.jpg', '000023.jpg', '000024.jpg', '000025.jpg', '000026.jpg', '000027.jpg', '000028.jpg', '000029.jpg', '000030.jpg', '000031.jpg', '000032.jpg',  '000033.jpg', '000034.jpg',  '000035.jpg', '000036.jpg',  '000037.jpg', '000039.jpg', '000041.jpg', '000045.jpg'], [])

  useEffect(() => {
    intervalId.current = setInterval(() => setActiveSlide( prev => ( prev + 1 ) % images.length ), 5000)

    return () => clearInterval(intervalId.current)
  }, [])

  function restartInterval(slideIndex){
    setActiveSlide(slideIndex)
    if(intervalId.current) {
      clearInterval(intervalId.current)
      intervalId.current = setInterval(() => setActiveSlide( prev => ( prev + 1 ) % images.length ), 5000)
    }
  }

  function handleSideButtons(direction){
    switch(direction){
      case 'left':
        setActiveSlide( prev => prev !== 0 ? prev - 1 : prev )
          break

      case 'right':
        setActiveSlide( prev => prev !== images.length - 1 ? prev + 1 : prev )
          break

        }

    if(intervalId.current) {
      clearInterval(intervalId.current)
      intervalId.current = setInterval(() => setActiveSlide( prev => ( prev + 1 ) % images.length ), 5000)
    }
  }

  return (
    <div className=" relative w-[95vw] md:w-[700px] h-[300px] mx-auto  mt-5 overflow-hidden ">
      <div className='z-6 absolute w-full h-full flex items-center justify-between *:block *:h-full *:w-7 *:bg-gray-900/10 *:text-white *:hover:bg-gray-900/50 *:cursor-pointer'>
        <ChevronLeft onClick={ () => handleSideButtons('left') } />
        <ChevronRight onClick={ () => handleSideButtons('right') } />
      </div>
      <div>
        {
          images.map( ( image, index ) => {
            return <img key={ image + index } src={ '/images/slides/' + image } className={ ` absolute z-5 top-0 left-[50%] h-full w-full bg-center translate-x-[-50%] md:left-[unset] md:translate-[unset] md:right-5 transition-opacity duration-500 ease-linear object-cover  ${ index === activeSlide ? " opacity-100 " : ' opacity-0 ' }` } />
          })
        }
        <div className=" absolute bg-white max-w-[95%] z-7 py-2 px-3 bottom-2 left-[50%] translate-x-[-50%] flex items-center gap-1 border-1 border-gray-400 rounded ">
          {
            images.map((image, index ) => {
              return <span className="flex items-center w-2 h-2 md:w-4 md:h-4 bg-white cursor-pointer " onClick={ () => restartInterval(index) }>
                        { index === activeSlide ? <CircleDot /> : <Circle /> }
                      </span>
            })
          }
        </div>
      </div>
    </div>
  )
}