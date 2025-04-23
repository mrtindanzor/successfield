import useAuth from "../Contexts/AuthenticationContext";
import { PendingLoading } from "./PendingLoader/";

const loader = <PendingLoading />

export default function StarterLoader(){
  const { initialFetch } = useAuth()

  return  initialFetch ? loader : null 
}