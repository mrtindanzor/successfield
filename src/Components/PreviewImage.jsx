import { useState, useMemo, useCallback, useEffect } from "react"

export default function PreviewImage({ file, setFeedback }){
  const allowedExts = useMemo(() => ['jpg','png','jpeg'], [])
  const [ image, setImage ] = useState(null)
  const setPreview = useCallback(() => {
    const splitName = file.name.split('.')
    const ext = splitName[splitName.length - 1].toLowerCase()
    if(!allowedExts.includes(ext)){
      setFeedback({error: true, message: 'image type not supported, select another image'})
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
        className="w-full h-auto overflow-hidden rounded-md" />
    </div>
  )
}