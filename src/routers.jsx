import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage";
import CoursesOverview from "./pages/Courses/CoursesOverview/CoursesOverview";
import Home from "./pages/Home/Home";
import LayoutOne from "./Components/Layouts/LayoutOne";
import NotFound from "./pages/NotFound/NotFound";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<LayoutOne />}>
      <Route index element={<Home />} />
      <Route path='courses' element={<CoursesOverview />} />
      <Route path='users/:route' element={<AuthenticationPage />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

export default router