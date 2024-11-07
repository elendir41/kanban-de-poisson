import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import SignIn from "./pages/SignIn";
import Kanban from "./pages/Kanban";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/kanban/:id" element={<Kanban/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </>
  );
}

export default App;
