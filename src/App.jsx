import "./styles/root.css";
import { AuthenticationProvider } from "./Contexts/AuthenticationContext/AuthenticationContext";
import { CoursesProvider } from "./Contexts/CourseContext/CoursesContext";
import router from "./routers";
import { RouterProvider } from "react-router-dom";
import { AlertMsgProvider } from "./Hooks/Alerter/Alerter";
import { ServerProvider } from "./Contexts/serverContexts/baseServer";
import { PendingLoaderProvider } from "./Contexts/PendingLoader/PendingLoaderContext";

function App() {

  return (
    <ServerProvider>
      <PendingLoaderProvider>
        <AlertMsgProvider>
          <AuthenticationProvider>
            <CoursesProvider>
              <RouterProvider router={router} />
            </CoursesProvider>
          </AuthenticationProvider>
        </AlertMsgProvider>
      </PendingLoaderProvider>
    </ServerProvider>
  )
}

export default App
