// MODULES //
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { lazy, Suspense } from 'react'

// COMPONENTS //
import { PendingLoading } from "./Hooks/Loader/PendingLoader/PendingLoader";
import ErrorElement from "./Components/ErrorElement/ErrorElement";
const LayoutOne = lazy(() => import("./Components/Layouts/LayoutOne"))
const NotAuthenticated = lazy(() => import('./Components/ProtectRoutes/NotAuthenticated').then( module => ({ default: module.NotAuthenticated }) ))

// OTHERS //
const Registration = lazy(() => import("./Components/Authentication/Registration/Registration") )
const Login = lazy(() => import("./Components/Authentication/Login/Login") )
const Course = lazy(() => import("./pages/Courses/Course/Course") )
const CoursesOverview = lazy(() => import("./pages/Courses/CoursesOverview/CoursesOverview") )
const Home = lazy(() => import("./pages/Home/Home") )
const NotFound = lazy(() => import("./pages/NotFound/NotFound") )
const Module = lazy(() => import("./pages/Courses/Module/Module") )
const VerifyCerificate = lazy(() => import("./pages/VerifyCertificate/VerifyCertificate") )
const Dashboard = lazy(() => import("./pages/Profile/Dashboard") )
const  ProfileListProvider = lazy(() => import("./Contexts/ProfileContext/ListContext").then( module => ({ default: module.ProfileListProvider })))
const AdminHome = lazy(() => import("./Admin/Home/AdminHome") )
const SignedIn = lazy(() => import("./Components/ProtectRoutes/SignedIn") )
const OnlyAdmin = lazy(() => import("./Components/ProtectRoutes/OnlyAdmin") )

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route >
      <Route path="/admin" element={ <Suspense fallback={ <PendingLoading /> } >
                                        <NotAuthenticated>
                                          <OnlyAdmin>
                                            <AdminHome />
                                          </OnlyAdmin> 
                                        </NotAuthenticated>
                                      </Suspense> }
                                      errorElement={ <ErrorElement /> }
                                       />
                                    
      <Route path='/' element={ <Suspense fallback={ <PendingLoading /> } >
                                  <LayoutOne />
                                </Suspense> }
                                errorElement={ <ErrorElement /> }
                                >
                                
      <Route index element={ <Suspense fallback={ <PendingLoading /> } >
                                <Home />  
                              </Suspense> } />
                              
      <Route path='verify-certificate' element={ <Suspense fallback={ <PendingLoading /> } >
                                                    <VerifyCerificate />
                                                  </Suspense> } />
                                                  
      <Route path='courses' element={ <Suspense fallback={ <PendingLoading /> } >
                                        <CoursesOverview />
                                      </Suspense> } />
                                      
      <Route path='courses/:course' element={ <Suspense fallback={ <PendingLoading /> } >
                                                <Course />
                                              </Suspense> } />
                                              
      <Route path='courses/:course/:module' element={ <Suspense fallback={ <PendingLoading /> } >
                                                        <NotAuthenticated> 
                                                          <Module /> 
                                                        </NotAuthenticated>
                                                      </Suspense>} />
                                                      
      <Route path='users/join' element={ <Suspense fallback={ <PendingLoading /> } >
                                              <SignedIn>
                                                <Registration />
                                              </SignedIn>
                                            </Suspense> } />
                                                      
      <Route path='users/students-area' element={ <Suspense fallback={ <PendingLoading /> } >
                                              <SignedIn>
                                                <Login />
                                              </SignedIn>
                                            </Suspense> } />
                                            
      <Route path='dashboard/profile' element={ <Suspense fallback={ <PendingLoading /> } >
                                                  <NotAuthenticated> 
                                                    <ProfileListProvider>
                                                      <Dashboard />
                                                    </ProfileListProvider> 
                                                  </NotAuthenticated>
                                                </Suspense> } />

      <Route path='*' element={ <Suspense fallback={ <PendingLoading /> } >
                                  <NotFound />
                                </Suspense> } />
    </Route>
    </Route>
  )
)

export default router