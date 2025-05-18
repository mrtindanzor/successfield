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
      <div
        className="relative w-[calc(100vw-2.5rem)] p-5 sm:px-10 h-[300px] flex overflow-hidden lg:max-w-[1440px] mx-auto">
        {
          images.map( ( image, index ) => {
            return <img key={ image + index } src={ '/images/slides/' + image } className={ `absolute w-full h-full transition-transform object-contain duration-1000 ease-linear ${ activeSlide === index ? '': 'translate-x-[100vw]' }` } />
          })
        }
      </div>
  )
}