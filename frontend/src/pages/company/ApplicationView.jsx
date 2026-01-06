import React, { useState } from "react";

// Colored Avatar Fallback (if no photo)
const ColoredAvatar = ({ name, size = "h-24 w-24" }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-red-500",
  ];
  const colorIndex = name.charCodeAt(0) % colors.length;

  return (
    <div
      className={`${size} ${colors[colorIndex]} rounded-full flex items-center justify-center text-white font-bold text-3xl ring-4 ring-white shadow-lg`}
    >
      {initials}
    </div>
  );
};

// Main Popup Modal Component
const ApplicantProfilePopup = ({ isOpen, onClose, applicant }) => {
  const [status, setStatus] = useState(applicant?.status || "Applied");

  if (!isOpen || !applicant) return null;

  const appliedDate = new Date(applicant.applied_at).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Applicant Profile
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-8 text-center">
          {/* Avatar */}
          <ColoredAvatar name={applicant.student_name} />

          {/* Name & Email */}
          <h3 className="mt-4 text-2xl font-bold text-gray-900">
            {applicant.student_name}
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            {applicant.email || "student@example.com"}
          </p>

          {/* Applied Position */}
          <div className="mt-8 text-left rounded-xl bg-gray-50 p-5">
            <h4 className="font-medium text-gray-900">Applied Position</h4>
            <p className="mt-2 text-lg font-semibold text-gray-800">
              {applicant.job_title}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Amsterdam, Netherlands • Remote
            </p>
          </div>

          {/* Application Details */}
          <div className="mt-6 text-left">
            <h4 className="font-medium text-gray-900">Application Details</h4>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-gray-900">{status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Applied Date:</span>
                <span className="font-medium text-gray-900">{appliedDate}</span>
              </div>
            </div>
          </div>

          {/* Download Resume Button */}
          <button className="mt-8 w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white shadow hover:bg-blue-700 transition flex items-center justify-center gap-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Resume
          </button>

          {/* Change Application Status Dropdown */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Change Application Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="Applied">Applied</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfilePopup;