import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Kanban from "./pages/Kanban";
import { Separator } from "@/components/ui/separator.tsx";
import React from "react";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/404";

function App() {
  return (
    <>
      <span className="flex justify-center text-3xl font-bold flex p-6">
        <Link to="/">KANBAN DE POISSON</Link>
      </span>
      <Separator />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/kanban/:id"
          element={
            <ProtectedRoute>
              <Kanban />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
