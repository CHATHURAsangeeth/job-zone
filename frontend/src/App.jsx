import { NavBar } from "./components/NavBar.jsx";
import { Footer } from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Application from "./pages/company/Applicants.jsx";
import CompanyDashboard from "./pages/company/CompanyDashboard.jsx";
import PostJob from "./pages/company/PostJob.jsx";
import "./index.css";

export default function App() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <NavBar />
      <section className="bg-white w-screen flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/applications" element={<Application />} />
          <Route path="/companyDashboard" element={<CompanyDashboard />} />
          <Route path="/postjob" element={<PostJob />} />
        </Routes>
      </section>

      <section className="mt-auto mb-0">
        <Footer />
      </section>
    </div>
  );
}
