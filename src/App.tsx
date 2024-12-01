import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Kanban from "./pages/Kanban";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/kanban/:id" element={<Kanban/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </>
  );
}

export default App;
