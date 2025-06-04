// MODULES //
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { lazy, Suspense } from 'react'

// COMPONENTS //
import ErrorElement from "./Components/ErrorElement";
import { NotAuthenticated } from './Components/ProtectRoutes/NotAuthenticated';
import OnlyAdmin from './Components/ProtectRoutes/OnlyAdmin';
import LayoutOne from './Components/Layouts/LayoutOne';
import Home from './pages/Home';
import VerifyCerificate from './pages/VerifyCertificate';
import CoursesOverview from './pages/Courses/CoursesOverview';
import Course from './pages/Courses/Course';
import Module from './pages/Courses/Module/Module';
import Registration from "./Components/Authentication/Registration";
import SignedIn from './Components/ProtectRoutes/SignedIn';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Login from './Components/Authentication/Login';
import OnlyAuthorizedForModule from "./Components/ProtectRoutes/OnlyAuthorizedForModule";
import { PendingLoader } from "./Contexts/PendingLoaderContext";
import Accreditations from "./pages/Accreditations";
import Faq from "./pages/Faq";

//lazy components
const AdminHome = lazy(() => import('./Admin/Home/AdminHome'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route >
      <Route path="/admin" element={ <NotAuthenticated>
                                          <OnlyAdmin>
                                            <Suspense fallback={ <PendingLoader /> }>
                                              <AdminHome />
                                            </Suspense>
                                          </OnlyAdmin> 
                                        </NotAuthenticated> }

                                      errorElement={ <ErrorElement /> }
                                       />
                                    
      <Route path='/' element={ <LayoutOne /> } errorElement={ <ErrorElement /> } >
                                
        <Route index element={ <Home /> } />
                                
        <Route path='verify-certificate' element={ <VerifyCerificate /> } />

        <Route path='verify' element={ <VerifyCerificate /> } />

        <Route path='faq' element={ <Faq /> } />
                                                    
        <Route path='courses' element={ <CoursesOverview /> } />
                                                    
        <Route path='accreditations' element={ <Accreditations /> } />
                                        
        <Route path='courses/:course' element={ <Course /> } />
                                                
        <Route path='courses/:course/:module' element={ <NotAuthenticated> 
                                                          <OnlyAuthorizedForModule>
                                                            <Module /> 
                                                          </OnlyAuthorizedForModule>
                                                        </NotAuthenticated> } />
                                                        
        <Route path='users/join' element={ <SignedIn>
                                              <Registration />
                                            </SignedIn> } />
                                                        
        <Route path='users/students-area' element={ <SignedIn>
                                                      <Login />
                                                    </SignedIn> } />
                                              
        <Route path='dashboard/profile' element={ <NotAuthenticated> 
                                                      <Dashboard />
                                                  </NotAuthenticated> } />

        <Route path='*' element={ <NotFound /> } />
      </Route>
    </Route>
  )
)

export default router