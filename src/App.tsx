import "./App.css";
import {Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Kanban from "./pages/Kanban";
import {Separator} from "@/components/ui/separator.tsx";
import React from "react";

function App() {
    return (
        <>
          <span className="flex justify-center text-3xl font-bold flex p-6">
              <Link to="/">
                  KANBAN DE POISSON
              </Link>
          </span>
            <Separator/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/sign-in" element={<SignIn/>}/>
                <Route path="/kanban/:id" element={<Kanban/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </>
    );
}

export default App;
