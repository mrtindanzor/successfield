import { logout } from "../../Slices/userSlice";
import Dashboard_sub from "../../Components/Dashboard/DashboardTemplates/Dashboard_sub";
import { LucideOctagonX } from "lucide-react";
import { useDispatch } from "react-redux";

export default function LogoutConfirmation() {
  const dispatch = useDispatch()
  
  return (
    <Dashboard_sub>
      <button
        onClick={() => dispatch( logout() )}
        className='flex gap-2 hover:bg-red-600/40 bg-red-600/10 border-2 rounded border-transparent hover:border-red-600 px-3 items-center py-2 text-red-600 cursor-pointer'
      >
        <LucideOctagonX

        />
        <span>
          Proceed to logout
        </span>
      </button> 
    </Dashboard_sub>
  )
}
