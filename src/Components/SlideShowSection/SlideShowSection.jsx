import { useMemo, useState, useRef, useEffect } from 'react'

export default function SlideShowSection(){
  const [ activeSlide, setActiveSlide ] = useState(0)
  const intervalId = useRef()
  const images = useMemo(() => ['000015.jpg', '000016.jpg', '000017.jpg', '000018.jpg', '000019.jpg', '000020.jpg', '000021.jpg', '000022.jpg', '000023.jpg', '000024.jpg', '000025.jpg', '000026.jpg', '000027.jpg', '000028.jpg', '000029.jpg', '000030.jpg', '000031.jpg', '000032.jpg',  '000033.jpg', '000034.jpg',  '000035.jpg', '000036.jpg',  '000037.jpg', '000039.jpg', '000041.jpg', '000045.jpg'], [])

  useEffect(() => {
    intervalId.current = setInterval(() => setActiveSlide( prev => ( prev + 1 ) % images.length ), 5000)

    return () => clearInterval(intervalId.current)
  }, [])


  return (
    <div className=" relative w-[100vw] h-[80vh] mt-5 overflow-hidden ">
      <div>
        {
          images.map( ( image, index ) => {
            return <img key={ image + index } src={ '/images/slides/' + image } className={ ` absolute z-5 top-0 left-[50%] translate-x-[-50%] md:left-[unset] md:translate-[unset] md:right-5 transition-opacity duration-500 ease-linear w-[70%] h-full object-cover  ${ index === activeSlide ? " opacity-100 " : ' opacity-0 ' }` } />
          })
        }
      </div>
    </div>
  )
}