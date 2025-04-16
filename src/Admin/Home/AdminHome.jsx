// STYLES //
import { PendingLoader } from '../../Contexts/PendingLoaderContext/PendingLoaderContext';
import Alerter from '../../Hooks/Alerter/Alerter';
import Details from '../Components/Details/Details';
import Header from '../Components/Header/Header';
import Navbar from '../Components/Navbar/Navbar';
import { NavigationProvider } from '../Contexts/NavigationContext/NavigationContext';

export default function AdminHome(){


  return (
    <>
      <PendingLoader />
      <Alerter />
      <h1 className="fixed top-0 left-0 h-15 w-[100vw] font-bold flex items-center pl-5 text-2xl bg-green-500"> ADMIN DASHBOARD </h1>
      <NavigationProvider>
        <Header />
        <Navbar />
        <Details />
      </NavigationProvider>
    </>
  )
}