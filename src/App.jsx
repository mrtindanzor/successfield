import "./styles/root.css";
import AuthenticationProvider from "./Hooks/useAuthentication/useAuthentication";
import CoursesProvider from "./Hooks/useCourses/useCourses";
import router from "./routers";
import { RouterProvider } from "react-router-dom";
import { AlertMsgProvider } from "./Hooks/Alerter/Alerter";

function App() {

  return (
    <AlertMsgProvider>
      <AuthenticationProvider>
        <CoursesProvider>
            <RouterProvider router={router} />
        </CoursesProvider>
      </AuthenticationProvider>
    </AlertMsgProvider>
  )
}

export default App
