import React from "react";

// Optional: Inline icons (you can replace with your icon library like lucide-react or heroicons)
const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export const StudentProfile = () => {
  // Mock student data - replace with real data from context/API later
  const student = {
    name: "Alexandra Chen",
    email: "alexandra.chen@university.edu",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA • Open to relocation",
    avatar: "", // Add URL for real avatar
    bio: "Final-year Computer Science student passionate about full-stack development and AI. Seeking summer internships or entry-level roles in software engineering. Experienced in React, Node.js, Python, and machine learning.",
    education: {
      degree: "B.S. Computer Science",
      university: "Stanford University",
      graduation: "Expected June 2026",
      gpa: "3.8 / 4.0",
    },
    skills: ["React", "TypeScript", "Node.js", "Python", "Java", "SQL", "Git", "Docker", "AWS", "TensorFlow", "Figma"],
    seeking: ["Full-time", "Internship", "Remote", "Hybrid"],
    links: {
      linkedin: "https://linkedin.com/in/alexandrachen",
      github: "https://github.com/alexchen",
      portfolio: "https://alexchen.dev",
    },
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 mt-16">
      {/* Header - Avatar & Basic Info */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="shrink-0">
            {student.avatar ? (
              <img
                src={student.avatar}
                alt={student.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                {student.name.split(" ").map((n) => n[0]).join("")}
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
            <p className="text-lg text-gray-600 mt-2">{student.education.degree} Student</p>
            <p className="text-gray-700 mt-3 max-w-3xl">{student.bio}</p>

            <div className="flex flex-wrap gap-6 mt-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MailIcon />
                <span>{student.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon />
                <span>{student.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <LocationIcon />
                <span>{student.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Education</h2>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-medium text-gray-900">{student.education.degree}</h3>
            <p className="text-gray-700 mt-1">{student.education.university}</p>
            <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
              <CalendarIcon />
              {student.education.graduation} • GPA: {student.education.gpa}
            </p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {student.skills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Job Preferences */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Looking For</h2>
        <div className="flex flex-wrap gap-3">
          {student.seeking.map((type) => (
            <span
              key={type}
              className="px-5 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium"
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      {student.links && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {student.links.linkedin && (
              <a
                href={student.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition text-gray-800 font-medium"
              >
                <span>LinkedIn</span>
              </a>
            )}
            {student.links.github && (
              <a
                href={student.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition text-gray-800 font-medium"
              >
                <span>GitHub</span>
              </a>
            )}
            {student.links.portfolio && (
              <a
                href={student.links.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition text-gray-800 font-medium"
              >
                <span>Portfolio</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;