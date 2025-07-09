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
import { Loading } from './Components/Loader'
import FindPro from "./pages/FindPro";
import AccountInformationList from "./pages/AccountInformation/AccountInformationList";
import AccountInformation from "./pages/AccountInformation/AccountInformation";
import MyCertificates from "./pages/Certificates/MyCertificates";
import MyCertificate from "./pages/Certificates/MyCertificate";
import MyCourses from "./pages/MyCourses/MyCourses";
import LogoutConfirmation from "./pages/Dashboard/Logout";

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
            <Suspense fallback={ <Loading /> }>
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

        <Route path='faqs' element={ <Suspense fallback={ <Loading /> }>
            <Faq />
          </Suspense> } />
                                                    
        <Route path='courses' element={ <CoursesOverview /> } />
                                                    
        <Route path='accreditations' element={ <Suspense fallback={ <Loading /> }>
            <Accreditations />
          </Suspense> } />
                                        
        <Route path='courses/:course' element={ <Suspense fallback={ <Loading /> }>
            <Course />
          </Suspense> } />
                                                
        <Route path='courses/:course/module' element={ <NotAuthenticated> 
            <Suspense fallback={ <Loading /> }>
              <OnlyAuthorizedForModule>
                <Module /> 
              </OnlyAuthorizedForModule>
            </Suspense>
          </NotAuthenticated> } />
                                                        
        <Route path='users/join' element={ <SignedIn>
            <Suspense fallback={ <Loading /> }>
              <Registration />
            </Suspense>
          </SignedIn> } />
                                                        
        <Route path='users/students-area' element={ <SignedIn>
            <Login />
          </SignedIn> } />
                                              
        <Route path='dashboard' element={ <NotAuthenticated>
            <Suspense fallback={ <Loading /> }>
              <Dashboard />
            </Suspense>
          </NotAuthenticated> } />

        <Route path='dashboard/account-information' element={ <NotAuthenticated>
            <Suspense fallback={ <Loading /> }>
              <AccountInformation />
            </Suspense>
          </NotAuthenticated> } />

        <Route path='dashboard/account-information/:section' element={ <NotAuthenticated>
            <Suspense fallback={ <Loading /> }>
              <AccountInformationList />
            </Suspense>
          </NotAuthenticated> } />

        <Route path='dashboard/my-certificates' element={ <NotAuthenticated>
            <Suspense fallback={ <Loading /> }>
              <MyCertificates />
            </Suspense>
          </NotAuthenticated> } />

        <Route path='dashboard/my-certificates/:certificateCode' element={ <NotAuthenticated>
            <Suspense fallback={ <Loading /> }>
              <MyCertificate />
            </Suspense>
          </NotAuthenticated> } />

        <Route path='dashboard/my-courses' element={ <NotAuthenticated>
            <Suspense fallback={ <Loading /> }>
              <MyCourses />
            </Suspense>
          </NotAuthenticated> } />

        <Route path='dashboard/logout' element={ <NotAuthenticated>
            <Suspense fallback={ <Loading /> }>
              <LogoutConfirmation />
            </Suspense>
          </NotAuthenticated> } />

        <Route path='*' element={ <NotFound /> } />
      </Route>
    </Route>
  )
)

export default router