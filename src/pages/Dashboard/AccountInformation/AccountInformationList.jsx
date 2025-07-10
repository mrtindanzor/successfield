
import { useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import AccountInformation, { AccountLinks } from "./AccountInformation";

export default function AccountInformationList() {
  const { section } = useParams()
  const navigate = useNavigate()
  const ItemComponent = useMemo(() => {
    if(!section) return null
    const _t = section.trim().toLowerCase().replaceAll(' ', '-')
    const _s = AccountLinks.find( item => item.title.toLowerCase().replaceAll(' ', '-') === _t )
    if(!_s) return null
    return _s.comp
  }, [section])

  if(!ItemComponent) navigate('/not-found')

  return (
    <AccountInformation>
      { ItemComponent }
    </AccountInformation>
  )
}
