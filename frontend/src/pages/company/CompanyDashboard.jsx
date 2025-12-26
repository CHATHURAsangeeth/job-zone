
import React from "react";

/** ------------------------------
 * Demo Data (replace with API data)
 * ------------------------------ */
const kpis = [
  { id: "jobs", label: "Active Jobs", value: 3, trend: "100%", color: "bg-blue-600", icon: "briefcase" },
  { id: "applicants", label: "Total Applicants", value: 11, trend: "100%", color: "bg-emerald-600", icon: "users" },
  { id: "hired", label: "Hired", value: 3, trend: "100%", color: "bg-violet-600", icon: "checkCircle" },
];

const recentJobs = [
  {
    id: 1,
    title: "Financial Analyst",
    location: "Mumbai, India",
    date: "5th 07 2025",
    status: "Active",
  },
  {
    id: 2,
    title: "DevOps Engineer",
    location: "Amsterdam, Netherlands",
    date: "5th 07 2025",
    status: "Active",
  },
  {
    id: 3,
    title: "Sales Manager",
    location: "Toronto, Canada",
    date: "5th 07 2025",
    status: "Active",
  },
];

const recentApplications = [
  {
    id: 101,
    initials: "DJ",
    name: "David Jackson",
    jobTitle: "Financial Analyst",
    ago: "3 days ago",
  },
  {
    id: 102,
    initials: "DJ",
    name: "David Jackson",
    jobTitle: "DevOps Engineer",
    ago: "3 days ago",
  },
  {
    id: 103,
    initials: "DJ",
    name: "David Jackson",
    jobTitle: "Sales Manager",
    ago: "3 days ago",
  },
];

const quickActions = [
  { id: "post", label: "Post a Job", icon: "plus" },
  { id: "manage", label: "Manage Jobs", icon: "layer" },
  { id: "applications", label: "View Applications", icon: "inbox" },
  { id: "company", label: "Company Profile", icon: "building" },
];

/** ------------------------------
 * Inline SVG Icon Library
 * ------------------------------ */
const Icon = ({ name, className = "w-5 h-5" }) => {
  switch (name) {
    case "briefcase":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M9 6h6V4H9v2z" stroke="currentColor" strokeWidth="1.6" />
          <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 12h18" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "users":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M2 20c0-3.314 2.686-6 6-6" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="16" cy="11" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M11 20c0-3.314 2.686-6 6-6" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "checkCircle":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "chart":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M4 20h16M6 16v-5M12 16V8M18 16v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "mapPin":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 11a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "clock":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "badge":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "eye":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M1.5 12s4.5-7.5 10.5-7.5S22.5 12 22.5 12 18 19.5 12 19.5 1.5 12 1.5 12z" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "plus":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "layer":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 13l9 5 9-5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "inbox":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 13h5l2 3h4l2-3h6" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "building":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="5" y="3" width="10" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7 7h2M11 7h2M7 11h2M11 11h2M7 15h2M11 15h2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M15 21h4V9h-4" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    default:
      return null;
  }
};

/** ------------------------------
 * Small UI Parts
 * ------------------------------ */
const KPI = ({ label, value, trend, color, icon }) => (
  <div className={`relative overflow-hidden rounded-xl ${color} text-white p-6 shadow-sm`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-90">{label}</p>
        <h3 className="mt-1 text-3xl font-bold">{value}</h3>
        <div className="mt-2 flex items-center gap-2 text-sm opacity-90">
          <Icon name="chart" className="w-4 h-4" />
          <span>{trend}</span>
        </div>
      </div>
      <div className="rounded-xl bg-white/15 p-3">
        <Icon name={icon} className="w-6 h-6" />
      </div>
    </div>
  </div>
);

const StatusBadge = ({ text = "Active" }) => (
  <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-sm font-medium ring-1 ring-emerald-200">
    {text}
  </span>
);

/** Job card item */
const JobItem = ({ job }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:bg-gray-50 transition">
    <div className="flex items-center justify-between">
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
          <Icon name="badge" />
        </div>
        <div>
          <h4 className="text-base font-semibold text-gray-900">{job.title}</h4>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-gray-600">
            <Icon name="mapPin" className="w-4 h-4" />
            {job.location} · {job.date}
          </p>
        </div>
      </div>
      <StatusBadge text={job.status} />
    </div>
  </div>
);

/** Application list item */
const ApplicationRow = ({ app }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:bg-gray-50 transition">
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-semibold">
          {app.initials}
        </div>
        <div>
          <p className="text-base font-semibold text-gray-900">{app.name}</p>
          <p className="text-sm text-gray-600">{app.jobTitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Icon name="clock" className="w-4 h-4" />
        <span>{app.ago}</span>
      </div>
    </div>
  </div>
);

/** Quick action button */
const QuickAction = ({ label, icon, onClick = () => {} }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-50"
  >
    <span className="rounded-lg bg-gray-100 p-2 text-gray-700">
      <Icon name={icon} />
    </span>
    {label}
  </button>
);

/** ------------------------------
 * Main Component
 * ------------------------------ */
const CompanyDashboard = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 m-16">
      {/* Page Header */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">Welcome back!</p>
        <h1 className="mt-1 text-2xl font-semibold text-gray-900">
          Here’s what’s happening with your jobs today.
        </h1>
      </div>

      {/* KPI Row */}
      <div className="grid gap-4 md:grid-cols-3">
        {kpis.map((k) => (
          <KPI
            key={k.id}
            label={k.label}
            value={k.value}
            trend={k.trend}
            color={k.color}
            icon={k.icon}
          />
        ))}
      </div>

      {/* Content Row: Recent Jobs + Recent Applications */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Recent Job Posts */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Recent Job Posts</h2>
              <p className="text-sm text-gray-500">Your latest job postings</p>
            </div>
            <a href="#/manage-jobs" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View all
            </a>
          </div>

          <div className="space-y-3">
            {recentJobs.map((job) => (
              <JobItem key={job.id} job={job} />
            ))}
          </div>
        </section>

        {/* Recent Applications */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
              <p className="text-sm text-gray-500">Latest candidate applications</p>
            </div>
            <a href="#/applications" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View all
            </a>
          </div>

          <div className="space-y-3">
            {recentApplications.map((app) => (
              <ApplicationRow key={app.id} app={app} />
            ))}
          </div>
        </section>
      </div>

      {/* Quick Actions */}
      <section className="mt-6">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Quick Actions</h2>
        <div className="flex flex-wrap items-center gap-3">
          {quickActions.map((qa) => (
            <QuickAction
              key={qa.id}
              label={qa.label}
              icon={qa.icon}
              onClick={() => {
                // Replace with navigation or action handlers
                // e.g., navigate("/post-job")
                console.log("Action:", qa.id);
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CompanyDashboard;
