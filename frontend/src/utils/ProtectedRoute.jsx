import { Navigate, Outlet } from "react-router-dom";
import { isUserLoggedIn, loggedUserData } from "../services/auth.service";

const ProtectedRoute = (RouterRole) => {
  const isUserLogged = isUserLoggedIn();

  const { user } = isUserLogged && loggedUserData();

  return user?.role === RouterRole.role ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
