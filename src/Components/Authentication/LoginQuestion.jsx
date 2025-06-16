import { Link } from 'react-router-dom'

const LoginQuestion = ({ question, label, link }) => {
  return (
    <p
      className="flex flex-wrap gap-3"
    >
      <span
        className="text-xl"
      > { question } </span>
      <Link
        className="underline text-red-600 md:font-semibold"
        to={link}
      > { label } </Link>
    </p>
  )
}

export default LoginQuestion