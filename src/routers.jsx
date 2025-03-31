// MODULES //
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

// COMPONENTS //
import LayoutOne from "./Components/Layouts/LayoutOne";
import { NotAuthenticated } from './Components/ProtectRoutes/NotAuthenticated';

// OTHERS //
import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage";
import Course from "./pages/Courses/Course/Course";
import CoursesOverview from "./pages/Courses/CoursesOverview/CoursesOverview";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Module from "./pages/Courses/Module/Module";
import VerifyCerificate from "./pages/VerifyCertificate/VerifyCertificate";
import Dashboard from "./pages/Profile/Dashboard";
import { ProfileListProvider } from "./Contexts/ProfileContext/ListContext";
import AdminHome from "./Admin/Home/AdminHome";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route >
      <Route path="/admin" element={ <AdminHome /> } />
      <Route path='/' element={ <LayoutOne /> }>
      <Route index element={ <Home /> } />
      <Route path='verify-certificate' element={ <VerifyCerificate /> } />
      <Route path='courses' element={ <CoursesOverview /> } />
      <Route path='courses/:course' element={ <Course /> } />
      <Route path='courses/:course/:module' element={ <NotAuthenticated> <Module /> </NotAuthenticated>} />
      <Route path='users/:route' element={ <AuthenticationPage /> } />
      <Route path='dashboard/profile' element={
        <NotAuthenticated> 
          <ProfileListProvider>
          <Dashboard />
          </ProfileListProvider> 
        </NotAuthenticated> } />
      <Route path='*' element={ <NotFound /> } />
    </Route>
    </Route>
  )
)

export default router