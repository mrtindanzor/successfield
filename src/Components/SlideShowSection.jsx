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
        className="w-[calc(100%-2.5rem)] sm:w-[calc(100%-4rem)] md:w-[calc(100%-5rem)] max-w-[700px] mx-auto h-[300px] md:h-[400px]"
        >
          <div
            className="relative h-full overflow-hidden w-full md:min-w-[800px] drop-shadow-xl rounded-xl overflow-hidden">
            { images.map( ( image, index ) => {
                return <img key={ image + index } src={ '/images/slides/' + image } className={ `absolute md:top-[50%] md:translate-y-[-50%] w-full h-full md:h-auto transition object-cover md:object-contain duration-1000 md:duration-300 ease-linear drop-shadow-xl rounded-xl overflow-hidden ${ activeSlide === index ? ' ': 'opacity-0' }` } />
              }) }
              <button>
              <ChevronLeft 
                className={`absolute z-1 top-1/2 left-3 translate-y-[-1/2] ${ activeSlide === 0 ? 'pointer-events-none opacity-0' : '' } bg-black text-white rounded-full w-8 h-8 p-1 cursor-pointer hover:bg-gray-700 border-gray-400 border-1`}
                onClick={ () => handleSideButtons('left') }
                />
            </button>
            <button>
              <ChevronRight 
                className={`absolute z-1 top-1/2 right-3 translate-y-[-1/2] ${ activeSlide === images.length - 1 ? 'pointer-events-none opacity-0' : '' } bg-black text-white rounded-full w-8 h-8 p-1 cursor-pointer hover:bg-gray-700 border-gray-400 border-1`}
                onClick={ () => handleSideButtons('right') }
                />
            </button>
          </div>
      </div>
  )
}