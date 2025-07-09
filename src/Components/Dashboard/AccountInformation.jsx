import ListLink from './ListLink'

const Links =  [ { 
      title: 'Name',
      link: 'name'
    },
    { 
      title: 'Email',
      link: 'email'
    },
    { 
      title: 'Phone number',
      link: 'phone-number' 
    },
    { 
      title: 'Change password',
      link: 'password'
  }]

export default function AccountInformation() {

  return (
    <ul>
      { Links.map( item => <ListLink
        key={ item.link }
        title={ item.title }
        link={`/dashboard/account-information/${ item.link }`}
      />  ) }
    </ul>
  )
}