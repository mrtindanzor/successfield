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
import AccountInformationList from "./pages/Dashboard/AccountInformation/AccountInformationList";
import AccountInformation from "./pages/Dashboard/AccountInformation/AccountInformation";
import MyCertificates from "./pages/Dashboard/Certificates/MyCertificates";
import MyCertificate from "./pages/Dashboard/Certificates/MyCertificate";
import MyCourses from "./pages/Dashboard/MyCourses/MyCourses";
import LogoutConfirmation from "./pages/Dashboard/Logout";
import Dashboard_sub from "./Components/Dashboard/DashboardTemplates/Dashboard_sub";
import Name from "./Components/Dashboard/AccountInformation/Name";
import Email from "./Components/Dashboard/AccountInformation/Email";
import ChangePassword from "./Components/Dashboard/AccountInformation/ChangePassword";
import PhoneNumber from "./Components/Dashboard/AccountInformation/PhoneNumber";

//lazy components
const AdminHome = lazy(() => import('./Admin/Home/AdminHome'))
const Accreditations = lazy(() => import("./pages/Accreditations"))
const Faq = lazy(() => import("./pages/Faq"))
const Registration = lazy(() => import("./Components/Authentication/Registration"))
const SignedIn = lazy(() => import('./Components/ProtectRoutes/SignedIn'))
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
                                              
        <Route path='dashboard/' element={ <NotAuthenticated>
            <Suspense fallback={ <Loading /> }>
              <Dashboard_sub />
            </Suspense>
          </NotAuthenticated> }>
          
          <Route path="account-information" element={ <AccountInformation /> }>
            <Route path="name" element={ <Name /> } />
            <Route path="email" element={ <Email /> } />
            <Route path="change-password" element={ <ChangePassword /> } />
            <Route path="phone-number" element={ <PhoneNumber /> } />
          </Route>

          <Route path="my-certificates" element={ <MyCertificates /> }>
            <Route path=":certificateCode" element={ <MyCertificate /> } />       
          </Route>

          <Route path="my-courses" element={ <MyCourses /> } />

          <Route path="logout" element={ <LogoutConfirmation /> } />
        </Route>

        <Route path='*' element={ <NotFound /> } />
      </Route>
    </Route>
  )
)

export default router