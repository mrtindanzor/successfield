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
import NotFound from './pages/NotFound';
import Login from './Components/Authentication/Login';
import { PendingLoader } from "./Contexts/PendingLoaderContext";
import FindPro from "./pages/FindPro";

//lazy components
const AdminHome = lazy(() => import('./Admin/Home/AdminHome'))
const Accreditations = lazy(() => import("./pages/Accreditations"))
const Faq = lazy(() => import("./pages/Faq"))
const Registration = lazy(() => import("./Components/Authentication/Registration"))
const SignedIn = lazy(() => import('./Components/ProtectRoutes/SignedIn'))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const OnlyAuthorizedForModule = lazy(() => import("./Components/ProtectRoutes/OnlyAuthorizedForModule"))
const Course = lazy(() => import('./pages/Courses/Course'))
const Module = lazy(() => import('./pages/Courses/Module/Module'))
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

        <Route path="find-professional" element={ <FindPro /> } />
                                
        <Route path='verify-certificate' element={ <VerifyCerificate /> } />

        <Route path='verify' element={ <VerifyCerificate /> } />

        <Route path='faqs' element={ <Suspense fallback={ <PendingLoader /> }>
                                        <Faq />
                                      </Suspense> } />
                                                    
        <Route path='courses' element={ <CoursesOverview /> } />
                                                    
        <Route path='accreditations' element={ <Suspense fallback={ <PendingLoader /> }>
                                                  <Accreditations />
                                                </Suspense> } />
                                        
        <Route path='courses/:course' element={ <Suspense fallback={ <PendingLoader /> }>
                                                  <Course />
                                                </Suspense> } />
                                                
        <Route path='courses/:course/:module' element={ <NotAuthenticated> 
                                                          <Suspense fallback={ <PendingLoader /> }>
                                                            <OnlyAuthorizedForModule>
                                                              <Module /> 
                                                            </OnlyAuthorizedForModule>
                                                          </Suspense>
                                                        </NotAuthenticated> } />
                                                        
        <Route path='users/join' element={ <SignedIn>
                                              <Suspense fallback={ <PendingLoader /> }>
                                                <Registration />
                                              </Suspense>
                                            </SignedIn> } />
                                                        
        <Route path='users/students-area' element={ <SignedIn>
                                                      <Login />
                                                    </SignedIn> } />
                                              
        <Route path='dashboard/profile' element={ <NotAuthenticated>
                                                    <Suspense fallback={ <PendingLoader /> }>
                                                      <Dashboard />
                                                    </Suspense>
                                                  </NotAuthenticated> } />

        <Route path='*' element={ <NotFound /> } />
      </Route>
    </Route>
  )
)

export default router