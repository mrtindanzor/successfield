import ListLink from "../../../Components/Dashboard/ListLink";
import { KeyRoundIcon, Mail, PenSquareIcon, Phone } from "lucide-react";
import { useEffect } from "react";
import { Outlet, useOutlet } from "react-router-dom";

export const AccountLinks =  [ { 
      title: 'Name',
      icon: PenSquareIcon
    },
    { 
      title: 'Email',
      icon: Mail
    },
    { 
      title: 'Phone number',
      icon: Phone
    },
    { 
      title: 'Change password',
      icon: KeyRoundIcon
  }]

export default function AccountInformation() {
  const hasChildren = useOutlet()

  useEffect(() => {
    document.title = 'Successfield | Account Information'
  }, [])

  return (
    <div
      className={`${ hasChildren ? 'grid md:grid-cols-[auto_1fr]':'' }`}
    >
      <ul
        className={`${ hasChildren ? 'hidden md:block':'md:w-fit' } h-screen md:bg-gray-200`}
      >
        { AccountLinks.map( item => <ListLink 
          key={item.title}
          link={`/dashboard/account-information/${item.title.trim().toLowerCase().replaceAll(' ', '-')}`}
          title={item.title}
        >
          { <item.icon
            className="w-5 h-5"
          /> }
        </ListLink> ) }
      </ul>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
