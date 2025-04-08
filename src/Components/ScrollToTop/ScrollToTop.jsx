import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import usePendingLoader from "../../Hooks/Loader/PendingLoader/PendingLoader";


export default function ScrollToTop(){

  const { pathname } = useLocation()
  const { isPendingLoader, setIsPendingLoader } = usePendingLoader()

  useEffect(() => {
    window.scrollTo(0,0)
    if(isPendingLoader) setIsPendingLoader(false)
  }, [pathname])

  return null
}