import "./styles/root.css";
import SetDependencies from './Components/SetDependencies'
import Loader from './Components/Loader'
import Alert from './Components/Alert'
import router from "./routers";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <SetDependencies>
      <Loader />
      <Alert />
      <RouterProvider router={router} />
    </SetDependencies>
  )
}

export default App
