import "./styles/root.css";
import { AuthenticationProvider } from "./Contexts/AuthenticationContext";
import { CoursesProvider } from "./Contexts/CoursesContext";
import { PendingLoaderProvider } from "./Contexts/PendingLoaderContext";
import router from "./routers";
import { RouterProvider } from "react-router-dom";
import { AlertMsgProvider } from "./Hooks/Alerter";
import { ServerProvider } from "./Contexts/baseServer";

function App() {

  return (
    <ServerProvider>
      <PendingLoaderProvider >
        <AlertMsgProvider>
          <AuthenticationProvider>
            <CoursesProvider>
              <RouterProvider router={router} />
            </CoursesProvider>
          </AuthenticationProvider>
        </AlertMsgProvider>
      </PendingLoaderProvider >
    </ServerProvider>
  )
}

export default App
