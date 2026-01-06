import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  fetchApplications,
  handleApplicationStatus,
} from "../../controllers/api.controller";
import LoadingSnippet from "../../components/LoadingSnippet";
import { toast } from "react-toastify";

/** Colored avatar with initials fallback */
const ColoredAvatar = ({ name, size = "h-12 w-12" }) => {
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
      className={`${size} ${colors[colorIndex]} rounded-full flex items-center justify-center text-white font-semibold text-lg ring-1 ring-gray-200`}
    >
      {initials}
    </div>
  );
};

/** Inline Icons */
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

/** Status Pill with colors */
const StatusPill = ({ status = "Pending" }) => {
  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-800",
    Accepted: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md px-3 py-1 text-sm font-medium ${
        statusStyles[status] || statusStyles.Pending
      }`}
    >
      {status}
    </span>
  );
};

const SectionHeader = () => (
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">Welcome back!</p>
      <h1 className="mt-1 text-2xl font-semibold text-gray-900">
        Applications Overview
      </h1>
    </div>
  </div>
);

const JobBanner = ({ title, count = 0 }) => (
  <div className="relative overflow-hidden rounded-xl bg-blue-600 p-5 text-white shadow-sm">
    <div className="flex items-center justify-between">
      {/* Title Section */}
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      {/* Count Section */}
      <span className="rounded-lg bg-blue-500/30 px-4 py-2 text-sm font-medium">
        {count} Applications
      </span>
    </div>
  </div>
);

const ApplicationItem = ({ app }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formattedDate = new Date(app.applied_at).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const [status, setStatus] = useState("Pending");

  return (
    <div className="group rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm transition hover:bg-gray-50">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <ColoredAvatar name={app.student_name} />
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              {app.student_name}
            </h3>
            <p className="text-sm text-gray-600">
              Applied for: {app.job_title}
            </p>
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
              Applied {formattedDate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StatusPill status={app.status} />
          <a href={app.resume_url} target="_blank">
            <button
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
              title="Download resume"
            >
              <DownloadIcon />
              Resume
            </button>
          </a>
          <button
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-100"
            title="View profile"
            onClick={() => setIsModalOpen(true)}
          >
            <EyeIcon />
            View Profile
          </button>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 w-full flex items-center justify-center overflow-x-auto overflow-y-auto outline-none focus:outline-none">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative w-[450px] max-w-2xl mx-auto my-6">
            <div className="relative flex flex-col bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-2xl font-semibold">Applicant Profile</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-3xl"
                >
                  &times;
                </button>
              </div>

              {/* Body - Matching your screenshot */}
              <div className="relative p-8 flex-auto">
                <div className="flex flex-col items-center text-center">
                  <ColoredAvatar name="Jennifer Miller" />
                  <h4 className="text-xl font-bold">{app.student_name}</h4>
                  <p className="text-gray-600">{app.student_email}</p>
                </div>

                <div className="mt-8 space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold">Applied Position</h5>
                    <p>{app.job_title}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold">Application Details</h5>
                    <div className="flex justify-between items-center">
                      <div>
                        <p>Status:</p>
                        <p>Applied Date:</p>
                      </div>
                      <div className="text-right">
                        <StatusPill status={app.status} />
                        <p>{formattedDate}</p>
                      </div>
                    </div>
                  </div>

                  <a href={app.resume_url} target="_blank" rel="noreferrer">
                    <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
                        />
                      </svg>
                      Download Resume
                    </button>
                  </a>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Change Application Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Interview">Interview</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Accepted">Accepted</option>
                    </select>
                  </div>
                  {(status === "Interview" ||
                    status === "Rejected" ||
                    status === "Accepted") && (
                    <button
                      onClick={async () => {
                        try {
                          const res = await handleApplicationStatus({
                            applicationId: app._id,
                            status: status,
                          });
                          if (res.success) {
                            toast.success(
                              "Application Status Update successfully"
                            );
                          }
                        } catch (error) {
                          toast.error(error.message);
                        } finally {
                          setTimeout(() => {
                            window.location.reload();
                          }, 1000);
                        }
                      }}
                      className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    >
                      Update Application Status
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Application = () => {
  let dummyApplications;
  const {
    data: applications = [],
    isLoading: applicationsLoading,
    error: applicationsError,
  } = useQuery({
    queryKey: ["companyApplications"],
    queryFn: fetchApplications,
  });
  dummyApplications = applications.reduce((acc, app) => {
    // Check if job already exists
    let job = acc.find((j) => j.id === app.job_id);
    if (job) {
      job.content.push(app);
    } else {
      acc.push({
        id: app.job_id,
        title: app.job_title,
        content: [app],
      });
    }
    return acc;
  }, []);

  if (applicationsLoading) {
    return <LoadingSnippet />;
  }
  if (applicationsError) {
    return toast.error(applicationsError?.message);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 mt-16">
      {/* Back button + header */}
      <div className="mb-5">
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
        <SectionHeader />
      </div>
      {/* Applications List */}
      <div className="mt-6 space-y-4">
        {dummyApplications.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No applications yet.</p>
        ) : (
          dummyApplications.map((job) => (
            <React.Fragment key={job.title}>
              <JobBanner title={job.title} count={job.content.length} />

              {job.content.map((application) => (
                <ApplicationItem key={application._id} app={application} />
              ))}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default Application;
