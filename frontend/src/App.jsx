import { NavBar } from "./components/NavBar.jsx";
import { Footer } from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Applicants  from "./pages/company/Applicants.jsx";
import CompanyDashboard from "./pages/company/CompanyDashboard.jsx";
import PostJob from "./pages/company/PostJob.jsx";
import Jobs from "./pages/student/Jobs.jsx";
import JobDetails from "./pages/student/JobDetails.jsx";
import Profile from "./pages/student/Profile.jsx";
import "./index.css";


export default function App() {
  return (
    <div className="w-full min-h-screen">
     <NavBar />
      <section className="bg-white w-screen"></section>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/applicants' element={<Applicants />}/>
        <Route path='/companyDashboard' element={<CompanyDashboard />}/>
        <Route path='/postJob' element={<PostJob />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/jobDetails' element={<JobDetails />} />
        <Route path='/profile' element={<Profile />} />

      </Routes>
      
   <Footer />
    </div>
  );
}
