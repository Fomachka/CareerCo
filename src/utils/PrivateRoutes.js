import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";

const PrivateRoutes = () => {
  const { user, validatingUser } = useContext(UserContext);
  const { isLoggedIn } = useAuth();

  if (validatingUser) {
    return <Outlet />;
  }

  if (!user) {
    return <Navigate to="/accounts" />;
  }

  return validatingUser && !user && !isLoggedIn ? (
    <Navigate to="/accounts" />
  ) : (
    <Outlet />
  );
};

export default PrivateRoutes;
