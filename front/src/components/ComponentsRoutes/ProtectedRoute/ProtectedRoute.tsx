import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = localStorage.getItem("isAuth") === "true" || sessionStorage.getItem("isAuth") === "true";

  if (!user) return <Navigate to={"/"} />;
  return <Outlet />;
};

export default ProtectedRoute;
