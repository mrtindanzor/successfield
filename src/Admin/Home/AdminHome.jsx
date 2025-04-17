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
      <NavigationProvider>
        <Header />
        <Navbar />
        <Details />
      </NavigationProvider>
    </>
  )
}