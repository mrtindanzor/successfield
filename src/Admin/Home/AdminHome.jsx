// STYLES //
import Aside from '../Components/Aside/Aside';
import Details from '../Components/Details/Details';
import Header from '../Components/Header/Header';
import Navbar from '../Components/Navbar/Navbar';
import { NavigationProvider } from '../Contexts/NavigationContext/NavigationContext';
import styles from './AdminHome.module.css';

export default function AdminHome(){


  return (
    <>
      <h1 className={ styles.heading }> ADMIN DASHBOARD </h1>
      <NavigationProvider>
        <div className={ styles.layout }>
          <Header />
          <div className={ styles.subSection }>
            <Aside />
            <div className={ styles.lastSection }>
              <Navbar />
              <Details />
            </div>
          </div>
        </div>
      </NavigationProvider>
    </>
  )
}