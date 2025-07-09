import { List, LucideLogOut, UserCog2 } from "lucide-react"
import ListLink from "./ListLink"

const Links = [
    {
      title: 'Account Information',
      link: 'account-information',
      icon: UserCog2
    },
    {
      title: 'My Certificates',
      link: 'my-certificates',
      icon: List
    },
    {
      title: 'My Courses',
      link: 'my-courses',
      icon: List
    },
    { 
      title: 'Log out',
      link: 'logout',
      icon: LucideLogOut
      }
  ]

export default function MainList() {
  return (
    <ul
      className="grid"
    >
      { Links.map( item => <ListLink
          key={item.link}
          title={item.title}
          link={`/dashboard/${ item.link }`}
      >
        <item.icon />
      </ListLink>) }
    </ul>
  )
}

