import LoginForm from "./components/LoginForm/LoginForm";

import { ThemeProvider } from "@mui/material";
import { theme } from "./helper/theme";

import React, { useEffect } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";

import { verifyToken } from "./api/helper/useToken";
import ProtectedRoute from "./components/ComponentsRoutes/ProtectedRoute/ProtectedRoute";

import RandomDog from "./components/RandomDog/RandomDog";
import ListRandomUsers from "./components/RandomUsers/ListRandomUsers";
import StatusHTTP from "./components/StatusHTTP/StatusHTTP";
import ListUsers from "./components/Users/ListUsers";
import ContainerLayout from "./layout/ContainerLayout";
import Navbar from "./layout/Navbar";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const isAuth = localStorage.getItem("isAuth") === "true" || sessionStorage.getItem("isAuth") === "true";
      const isTokenValid = await verifyToken();
      if (isTokenValid) {
        if (!isAuth) {
          sessionStorage.setItem("isAuth", "true");
          navigate(-1);
        }
      }
    };
    checkToken();
  });

  const handleLogout = (): void => {
    localStorage.removeItem("isAuth");
    sessionStorage.removeItem("isAuth");
    localStorage.removeItem("userId");
    sessionStorage.removeItem("userId");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <ContainerLayout>
          <Routes>
            <Route index element={<LoginForm />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<Navbar onLogout={handleLogout} />}>
                <Route path="random-users" element={<ListRandomUsers />} />
                <Route path="random-dog" element={<RandomDog />} />
                <Route path="status-http" element={<StatusHTTP />} />
                <Route path="users" element={<ListUsers />} />
              </Route>
            </Route>
          </Routes>
        </ContainerLayout>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
