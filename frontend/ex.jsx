 import React from "react";
//import "./App.css";
import NavBar from "./components/NavBar.jsx";
import { Route, Routes } from "react-router-dom";
import  Home from "./pages/Home.jsx";
import Login from "./pages/auth/Login.jsx";
import Register  from "./pages/auth/Register.jsx";
import Applicant from "./pages/company/Applicants.jsx";
import CompanyDashBoard from "./pages/company/CompanyDashboard.jsx";
import MyJobs from "./pages/company/MyJobs.jsx";
import PostJob from "./pages/company/PostJob.jsx";
import Applications from "./pages/student/Applications.jsx";
import Jobs from "./pages/student/Jobs.jsx";
import JobDetails from "./pages/student/JobDetails.jsx";
import Profile from "./pages/student/Profile.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
 
 <NavBar />

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/register' element={<Register />}/>
        <Route path='/company/applicant' element={<Applicant />} />
        <Route path='/company/dashboard' element={<CompanyDashBoard />} />
        <Route path='/company/MyJobs' element={<MyJobs />} />
        <Route path='/company/PostJob' element={<PostJob/>} />
        <Route path='/student/applications' element={<Applications />} />
        <Route path='/student/JobDetails' element={<JobDetails />} />
        <Route path='/student/jobs' element={<Jobs />} />
        <Route path='/student/profile' element={<Profile />} />
        <Route path='/student/dashboard' element={<StudentDashboard />} />

      </Routes>