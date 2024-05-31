import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes() {
  let token = localStorage.getItem();

  return token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
