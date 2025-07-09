import { useState, useMemo, useCallback, useEffect } from "react"
import { getExtension } from "../utils/CheckExtension"

export const allowedImageFormats = ['jpg','png','jpeg']

export default function PreviewImage({ file, setFeedback }){
  const [ image, setImage ] = useState(null)
  const setPreview = useCallback(() => {
    const ext = getExtension(file)
    if(!allowedImageFormats.includes(ext)){
      setFeedback({error: true, message: 'image type not supported, select another image'})
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return setImage(false)
    }
    const url = URL.createObjectURL(file)
    setImage(url)
  }, [file])

  useEffect(() => {
    file && setPreview()
    return () => image && URL.revokeObjectURL(image)
  } , [file])

  if(image === false) return null

  return (
    <div
      className="w-[min(80%,_300px)]"
      >
      <img 
        src={ image } 
        className="w-full h-auto overflow-hidden rounded-md drop-shadow-md drop-shadow-black" />
    </div>
  )
}