import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState, useRef, useEffect, useCallback } from 'react'

export default function SlideShowSection(){
  const [ activeSlide, setActiveSlide ] = useState(0)
  const intervalId = useRef()
  const images = useMemo(() => ['000015.jpg', '000016.jpg', '000017.jpg', '000018.jpg', '000019.jpg', '000020.jpg', '000021.jpg', '000022.jpg', '000023.jpg', '000024.jpg', '000025.jpg', '000026.jpg', '000027.jpg', '000028.jpg', '000029.jpg', '000030.jpg', '000031.jpg', '000032.jpg',  '000033.jpg', '000034.jpg',  '000035.jpg', '000036.jpg',  '000037.jpg', '000039.jpg', '000041.jpg', '000045.jpg'], [])

  const restartInterval = useCallback((slideIndex) => {
    setActiveSlide(slideIndex)
    if(intervalId.current) {
      clearInterval(intervalId.current)
      intervalId.current = setInterval(() => setActiveSlide( prev => ( prev + 1 ) % images.length ), 5000)
    }
  }, [intervalId])

  const handleSideButtons = useCallback((direction) => {
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
  }, [activeSlide, intervalId])

  useEffect(() => {
    intervalId.current = setInterval(() => setActiveSlide( prev => ( prev + 1 ) % images.length ), 5000)

    return () => clearInterval(intervalId.current)
  }, [])

  return (
      <div
        className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_auto_auto] md:justify-center w-[calc(100%-2.5rem)] sm:w-[calc(100%-4rem)] md:w-[calc(100%-5rem)] max-w-[1440px] mx-auto bg-gray-100 px-1 gap-1 h-[300px] md:h-[500px]"
        >
          <button>
            <ChevronLeft 
              className={`${ activeSlide === 0 ? 'pointer-events-none opacity-0' : '' } bg-gray-500 text-white rounded-full w-8 h-8 p-1 cursor-pointer hover:bg-gray-700`}
              onClick={ () => handleSideButtons('left') }
              />
          </button>
          <div
            className="relative h-full overflow-hidden w-full md:min-w-[800px]">
            {
              images.map( ( image, index ) => {
                return <img key={ image + index } src={ '/images/slides/' + image } className={ `absolute md:top-[50%] md:translate-y-[-50%] w-full h-full md:h-auto transition object-cover md:object-contain duration-1000 md:duration-300 ease-linear ${ activeSlide === index ? 'md:opacity-100': 'translate-x-[100vw] md:translate-x-0 md:opacity-0' }` } />
              })
            }
          </div>
          <button>
            <ChevronRight 
              className={`${ activeSlide === images.length - 1 ? 'pointer-events-none opacity-0' : '' } bg-gray-500 text-white rounded-full w-8 h-8 p-1 cursor-pointer hover:bg-gray-700`}
              onClick={ () => handleSideButtons('right') }
              />
          </button>
      </div>
  )
}