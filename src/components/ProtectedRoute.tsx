import { useServiceContext } from "@/context/ServiceContext";
import React from "react";
import { Navigate } from "react-router-dom";
import Header from "./Header";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const { authService } = useServiceContext();

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  authService.setLocalStorage(token, JSON.parse(user));

  return (
    <>
      <Header />
      {children}
    </>
  );
}
