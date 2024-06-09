import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes({auth}) {
  
  if (auth === null) {
    return <div>Loading...</div>; 
  }

  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
