import { NavBar } from "./components/NavBar.jsx";
import { Footer } from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="w-full min-h-screen">
      <NavBar />

      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      
      <Footer />
    </div>
  );
}
