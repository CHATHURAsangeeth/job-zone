import { NavBar } from "./components/NavBar.jsx";
import { Footer } from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";


export default function App() {
  return (
    <div className="w-full min-h-screen">
     <NavBar />
      <section className="bg-white w-screen"></section>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
      
   <Footer />
    </div>
  );
}
