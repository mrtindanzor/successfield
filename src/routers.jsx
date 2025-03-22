import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage";
import Course from "./pages/Courses/Course/Course";
import CoursesOverview from "./pages/Courses/CoursesOverview/CoursesOverview";
import Home from "./pages/Home/Home";
import LayoutOne from "./Components/Layouts/LayoutOne";
import NotFound from "./pages/NotFound/NotFound";
import { NotAuthenticated } from './Components/ProtectRoutes/NotAuthenticated'
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Module from "./pages/Courses/Module/Module";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<LayoutOne />}>
      <Route index element={<Home />} />
      <Route path='courses' element={<CoursesOverview />} />
      <Route path='courses/:course' element={<Course />} />
      <Route path='courses/:course/:module' element={<NotAuthenticated> <Module /> </NotAuthenticated>} />
      <Route path='users/:route' element={<AuthenticationPage />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

export default router