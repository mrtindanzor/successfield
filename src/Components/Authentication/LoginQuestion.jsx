import { Link } from 'react-router-dom'

const LoginQuestion = ({ question, label, link }) => {
  return (
    <p
      className="flex flex-wrap gap-3"
    >
      <span
        className="text-xl md:text-2xl font-semibold"
      > { question } </span>
      <Link
        className="underline text-red-600 md:text-xl md:font-semibold"
        to={link}
      > { label } </Link>
    </p>
  )
}

export default LoginQuestion