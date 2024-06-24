import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import ProtectedRoute from "./componets/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminHome from "./pages/AdminHome";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import ColorSchemesExample from "./componets/Navbar";
import AdminProtectedRoutes from "./componets/AdminProtectedRoutes";
import AdminLoginRedirect from "./componets/AdminLoginRedirect ";
import UserLoginRedirect from "./componets/UserLoginRedirect ";
import { useDispatch, useSelector } from "react-redux";
import { ACCESS_TOKEN } from "./constants";
import { logout } from "./redux/actions/authActions";
import UserProtectedRoute from "./componets/UserProtectedRoute";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserProtectedRoute element={<Home />} />} />

        <Route
          path="/profile"
          element={<UserProtectedRoute element={<UserProfile />} />}
        />
        
        <Route path="/login" element={<UserLoginRedirect><Login /></UserLoginRedirect>} />

        <Route path="/logout" element={<Logout />} />
        <Route
          path="/register"
          element={
            <UserLoginRedirect>
              <RegisterAndLogout />
            </UserLoginRedirect>
          }
        />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/adminlogin"
          element={
            !isAuthenticated ? <AdminLogin /> : <Navigate to="/adminhome" />
          }
        />

        <Route
          path="/adminhome"
          element={
            isAuthenticated ? <AdminHome /> : <Navigate to="/adminlogin" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
