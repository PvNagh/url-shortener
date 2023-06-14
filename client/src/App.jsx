import { Suspense, lazy } from "react";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));


const PrivateRoute = ({ ...props }) => {
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem("user"))?.user?.accessToken;
  const isAuthenticated = JSON.parse(localStorage.getItem("user"))?.authenticated;

  return isAuthenticated && token ?
    <Outlet />
    : <Navigate to="/login" state={{from:location.pathname}} replace />
};

function App() {

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* All protected routes in this Route component */}
          <Route path='/dashboard' element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} replace/>
          </Route>
          <Route path="*" element={<Navigate to="/dashboard"  />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;