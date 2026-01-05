
import React from "react";

/**
 * Demo applications data (similar to the screenshot).
 * You can replace this with data fetched from your API.
 */
const demoApplications = [
  {
    id: 1,
    name: "Michael Wilson",
    email: "user2@timetoprogram.com",
    appliedOn: "Applied 5th 07 2025",
    avatar: "https://i.pravatar.cc/80?img=12",
    status: "Applied",
    resumeUrl: "#",
    profileUrl: "#",
  },
  {
    id: 2,
    name: "Jennifer Miller",
    email: "user3@timetoprogram.com",
    appliedOn: "Applied 5th 07 2025",
    avatar: "https://i.pravatar.cc/80?img=47",
    status: "Applied",
    resumeUrl: "#",
    profileUrl: "#",
  },
  {
    id: 3,
    name: "William Anderson",
    email: "user4@timetoprogram.com",
    appliedOn: "Applied 5th 07 2025",
    avatar: "https://i.pravatar.cc/80?img=36",
    status: "Applied",
    resumeUrl: "#",
    profileUrl: "#",
  },
  {
    id: 4,
    name: "David Jackson",
    email: "user5@timetoprogram.com",
    appliedOn: "Applied 5th 07 2025",
    avatar: "https://i.pravatar.cc/80?img=22",
    status: "Applied",
    resumeUrl: "#",
    profileUrl: "#",
  },
];

/** Small inline icons (no external libraries) */
const MapPinIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"
    />
  </svg>
);

const LaptopIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeWidth={1.6} d="M3 5h18v11H3z" />
    <path strokeWidth={1.6} d="M2 18h20" />
  </svg>
);

const EyeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M1.5 12s4.5-7.5 10.5-7.5S22.5 12 22.5 12 18 19.5 12 19.5 1.5 12 1.5 12z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const DownloadIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3v10m0 0l-3-3m3 3l3-3M5 21h14"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** A pill-style label used for the "Applied" status */
const StatusPill = ({ text = "Applied" }) => (
  <span className="inline-flex items-center rounded-md bg-gray-100 text-gray-700 px-3 py-1 text-sm font-medium">
    {text}
  </span>
);

const SectionHeader = () => (
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">Welcome back!</p>
      <h1 className="mt-1 text-2xl font-semibold text-gray-900">
        Applications Overview
      </h1>
    </div>

    {/* Optional actions (search, filters, etc.) can be added here */}
  </div>
);

const JobBanner = ({ title, location, isRemote, category, count }) => (
  <div className="relative overflow-hidden rounded-xl bg-blue-600 p-5 text-white shadow-sm">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1">
            <MapPinIcon className="w-4 h-4" />
            {location}
          </span>
          <span className="inline-flex items-center gap-1">
            <LaptopIcon className="w-4 h-4" />
            {isRemote ? "Remote" : "On-site"}
          </span>
          <span className="inline-flex items-center gap-1">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            {category}
          </span>
        </div>
      </div>

      <span className="rounded-lg bg-blue-500/30 px-4 py-2 text-sm font-medium">
        {count} Applications
      </span>
    </div>
  </div>
);

const ApplicationItem = ({ app }) => {
  return (
    <div className="group rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm transition hover:bg-gray-50">
      <div className="flex items-center justify-between gap-4">
        {/* Left: avatar + applicant info */}
        <div className="flex items-center gap-4">
          <img
            src={app.avatar}
            alt={app.name}
            className="h-12 w-12 rounded-full object-cover ring-1 ring-gray-200"
          />
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              {app.name}
            </h3>
            <p className="text-sm text-gray-600">{app.email}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M7 10h10M7 14h7M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  strokeWidth="1.4"
                />
              </svg>
              {app.appliedOn}
            </p>
          </div>
        </div>

        {/* Right: status + actions */}
        <div className="flex items-center gap-3">
          <StatusPill text={app.status} />

          <a
            href={app.resumeUrl}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
            title="Download resume"
          >
            <DownloadIcon className="w-5 h-5" />
            Resume
          </a>

          <a
            href={app.profileUrl}
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-100"
            title="View profile"
          >
            <EyeIcon className="w-5 h-5" />
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
};

const Application = () => {
  // You can pass job details via props or route state; hardcoded here to match screenshot.
  const jobInfo = {
    title: "DevOps Engineer",
    location: "Amsterdam, Netherlands",
    isRemote: true,
    category: "IT & Software",
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 m-16">
      {/* Top header */}
      <div className="mb-5">
        {/* Back button row */}
        <div className="mb-3 flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50"
            onClick={() => window.history.back()}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M15 19l-7-7 7-7"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </button>

          <h2 className="text-xl font-semibold text-gray-900">
            Applications Overview
          </h2>
        </div>

        {/* Greeting + title */}
        <SectionHeader />
      </div>

      {/* Job banner */}
      <JobBanner
        title={jobInfo.title}
        location={jobInfo.location}
        isRemote={jobInfo.isRemote}
        category={jobInfo.category}
        count={demoApplications.length}
      />

      {/* Applications list */}
      <div className="mt-4 space-y-4">
        {demoApplications.map((app) => (
          <ApplicationItem key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
};

export default Application;
