import Home from "./pages/Home/Home";
import LayoutOne from "./Components/Layouts/LayoutOne";
import NotFound from "./pages/NotFound/NotFound";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<LayoutOne />}>
      <Route index element={<Home />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

export default router