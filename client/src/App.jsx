import { Suspense, lazy } from "react";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from "./components/Spinner";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';


const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Redirect = lazy(() => import("./pages/Redirect"))


const PrivateRoute = ({ ...props }) => {
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem("user"))?.user?.accessToken;
  const isAuthenticated = JSON.parse(localStorage.getItem("user"))?.authenticated;

  return isAuthenticated && token ?
    <Outlet />
    : <Navigate to="/login" state={{ from: location.pathname }} replace />
};

function App() {

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* All protected routes in this Route component */}
          <Route path='/home' element={<PrivateRoute />}>
            <Route path='/home' element={<Dashboard />} replace />
          </Route>
          <Route path="/:shortId" element={<Redirect />} />
          <Route path='*' element={<Dashboard />} replace />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;