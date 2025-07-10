import { logout } from "../../Slices/userSlice";
import { LucideOctagonX } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function LogoutConfirmation() {
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = 'Succcessfield | Logout'
  }, [])
  
  return (
    <button
      onClick={() => dispatch( logout() )}
      className='flex gap-2 hover:bg-red-600/40 bg-red-600/10 border-2 rounded hover:border-red-600 border-red-700 mx-2 px-3 items-center py-2 text-red-600 cursor-pointer'
    >
      <LucideOctagonX

      />
      <span>
        Proceed to logout
      </span>
    </button>
  )
}
