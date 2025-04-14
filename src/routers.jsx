// MODULES //
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

// COMPONENTS //
import ErrorElement from "./Components/ErrorElement/ErrorElement";
import { NotAuthenticated } from './Components/ProtectRoutes/NotAuthenticated';
import OnlyAdmin from './Components/ProtectRoutes/OnlyAdmin';
import AdminHome from './Admin/Home/AdminHome';
import LayoutOne from './Components/Layouts/LayoutOne';
import Home from './pages/Home/Home';
import VerifyCerificate from './pages/VerifyCertificate/VerifyCertificate';
import CoursesOverview from './pages/Courses/CoursesOverview/CoursesOverview';
import Course from './pages/Courses/Course/Course';
import Module from './pages/Courses/Module/Module';
import Registration from "./Components/Authentication/Registration/Registration";
import SignedIn from './Components/ProtectRoutes/SignedIn';
import { ProfileListProvider } from './Contexts/ProfileContext/ListContext';
import Dashboard from './pages/Profile/Dashboard';
import NotFound from './pages/NotFound/NotFound';
import Login from './Components/Authentication/Login/Login';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route >
      <Route path="/admin" element={ <NotAuthenticated>
                                          <OnlyAdmin>
                                            <AdminHome />
                                          </OnlyAdmin> 
                                        </NotAuthenticated> }

                                      /*errorElement={ <ErrorElement /> } */
                                       />
                                    
      <Route path='/' element={ <LayoutOne /> } /*errorElement={ <ErrorElement /> }*/ >
                                
        <Route index element={ <Home /> } />
                                
        <Route path='verify-certificate' element={ <VerifyCerificate /> } />
                                                    
        <Route path='courses' element={ <CoursesOverview /> } />
                                        
        <Route path='courses/:course' element={ <Course /> } />
                                                
        <Route path='courses/:course/:module' element={ <NotAuthenticated> 
                                                            <Module /> 
                                                          </NotAuthenticated> } />
                                                        
        <Route path='users/join' element={ <SignedIn>
                                              <Registration />
                                            </SignedIn> } />
                                                        
        <Route path='users/students-area' element={ <SignedIn>
                                                      <Login />
                                                    </SignedIn> } />
                                              
        <Route path='dashboard/profile' element={ <NotAuthenticated> 
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