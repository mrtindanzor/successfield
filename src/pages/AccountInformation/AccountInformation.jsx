import Name from "../../Components/Dashboard/AccountInformation/Name";
import Email from "../../Components/Dashboard/AccountInformation/Email";
import PhoneNumber from "../../Components/Dashboard/AccountInformation/PhoneNumber";
import ChangePassword from "../../Components/Dashboard/AccountInformation/ChangePassword";
import ListLink from "../../Components/Dashboard/ListLink";
import Dashboard_sub from "../../Components/Dashboard/DashboardTemplates/Dashboard_sub";
import { KeyRoundIcon, Mail, PenSquareIcon, Phone } from "lucide-react";

export const AccountLinks =  [ { 
      title: 'Name',
      icon: PenSquareIcon,
      comp: <Name />
    },
    { 
      title: 'Email',
      icon: Mail,
      comp: <Email />
    },
    { 
      title: 'Phone number',
      icon: Phone,
      comp: <PhoneNumber />
    },
    { 
      title: 'Change password',
      icon: KeyRoundIcon,
      comp: <ChangePassword />
  }]

export default function AccountInformation({ children }) {
  return (
    <Dashboard_sub>
      <div
        className={`${ children ? 'grid md:grid-cols-[auto_1fr]':'' }`}
      >
        <ul
          className={`${ children ? 'hidden md:block':'w-fit' } h-screen border-r-2 border-r-gray-600`}
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
          { children }
        </div>
      </div>
    </Dashboard_sub>
  )
}
