import useAuth from "./../../../Contexts/AuthenticationContext/AuthenticationContext";
import { PendingLoading } from "../PendingLoader/PendingLoader";

const loader = <PendingLoading />

export default function StarterLoader(){
  const { initialFetch } = useAuth()

  return  initialFetch ? loader : null 
}