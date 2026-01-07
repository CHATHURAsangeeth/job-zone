import { useQuery } from "@tanstack/react-query";
//import { toast } from "react-toastify";
import { timeFilter } from "../../constants/timeFilter";
import { Link, useNavigate } from "react-router-dom";
import { fetchApplications, fetchJobs } from "../../controllers/api.controller";
import LoadingSnippet from "../../components/LoadingSnippet";
import { toast } from "react-toastify";
import { isUserLoggedIn, loggedUserData } from "../../services/auth.service";
let isLogginUser = isUserLoggedIn();
const { user } = isLogginUser ? loggedUserData() : { user: null };

const quickActions = [
  { id: "post", label: "Post a Job", icon: "plus" },
  { id: "manage", label: "Manage Jobs", icon: "layer" },
  { id: "applications", label: "View Applications", icon: "inbox" },
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
          <rect
            x="3"
            y="7"
            width="18"
            height="13"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M3 12h18" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "users":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M2 20c0-3.314 2.686-6 6-6"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle
            cx="16"
            cy="11"
            r="3"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M11 20c0-3.314 2.686-6 6-6"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );
    case "checkCircle":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M8 12l3 3 5-6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "chart":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M4 20h16M6 16v-5M12 16V8M18 16v-3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "mapPin":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 11a3 3 0 100-6 3 3 0 000 6z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );
    case "clock":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M12 7v5l3 2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "badge":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "eye":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M1.5 12s4.5-7.5 10.5-7.5S22.5 12 22.5 12 18 19.5 12 19.5 1.5 12 1.5 12z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle
            cx="12"
            cy="12"
            r="3"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );
    case "plus":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "layer":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3l9 5-9 5-9-5 9-5z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M3 13l9 5 9-5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "inbox":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="4"
            width="18"
            height="16"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M3 13h5l2 3h4l2-3h6"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );
    case "building":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect
            x="5"
            y="3"
            width="10"
            height="18"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M7 7h2M11 7h2M7 11h2M11 11h2M7 15h2M11 15h2"
            stroke="currentColor"
            strokeWidth="1.6"
          />
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
  <div
    className={`relative overflow-hidden rounded-xl ${color} text-white p-6 shadow-sm`}
  >
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

const StatusBadge = ({ text = "active" }) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1
        ${
          text === "active"
            ? "bg-green-100 text-green-700 ring-green-200"
            : "bg-red-100 text-red-700 ring-red-200"
        }
      `}
  >
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
          {app?.student_name
            .split(" ")
            .slice(0, 2)
            .map((name) => name[0])
            .join("")
            .toUpperCase()}
        </div>
        <div>
          <p className="text-base font-semibold text-gray-900">
            {app.student_name}
          </p>
          <p className="text-sm text-gray-600">{app.job_title}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 text-sm text-gray-500">
        <div className="flex flex-row gap-2 mr-2">
          <Icon name="clock" className="w-4 h-4 mt-[2.4px]" />
          <span>{timeFilter(app.createdAt)}</span>
        </div>
        <StatusBadge text={app.status} />
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
  const {
    data: recentJobs = [],
    isLoading: jobsLoading,
    error: jobsError,
  } = useQuery({
    queryKey: ["companyJobs"],
    queryFn: fetchJobs,
  });

  const {
    data: recentApplications = [],
    isLoading: appsLoading,
    error: appsError,
  } = useQuery({
    queryKey: ["companyApplications"],
    queryFn: fetchApplications,
  });

  const navigate = useNavigate();
  if (jobsLoading || appsLoading) {
    return <LoadingSnippet />;
  }

  if (jobsError || appsError) {
    return toast.error(jobsError?.message || appsError?.message);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 m-16">
      {/* Page Header */}
      <div className="mb-6">
        <p className="text-sm text-gray-500"> Welcome <h2>{user?.name}</h2> </p>
        <h1 className="mt-1 text-2xl font-semibold text-gray-900">
          Here’s what’s happening with your jobs today.
        </h1>
      </div>

      {/* KPI Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <KPI
          key="jobs"
          label="Active Jobs"
          value={recentJobs.filter((job) => job.status === "active").length}
          trend="100%"
          color="bg-blue-600"
          icon="briefcase"
        />
        <KPI
          key="applicants"
          label="Total Applicants"
          value={
            recentApplications?.filter(
              (application) => application.status === "Pending"
            ).length
          }
          trend="100%"
          color="bg-emerald-600"
          icon="users"
        />
        <KPI
          key="hired"
          label="Hired"
          value={recentJobs.filter((job) => job.status === "active").length}
          trend="100%"
          color="bg-violet-600"
          icon="checkCircle"
        />
      </div>

      {/* Content Row: Recent Jobs + Recent Applications */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Recent Job Posts */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Job Posts
              </h2>
              <p className="text-sm text-gray-500">Your latest job postings</p>
            </div>
            <Link
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
              to="/companyDashboard/manage-jobs"
            >
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {recentJobs
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // newest first
              .slice(0, 3) // take only the first 3 jobs
              .map((job) => (
                <JobItem key={job._id} job={job} />
              ))}
          </div>
        </section>

        {/* Recent Applications */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Applications
              </h2>
              <p className="text-sm text-gray-500">
                Latest candidate applications
              </p>
            </div>
            <Link
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
              to="/companyDashboard/applications"
            >
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {recentApplications
              ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // newest first
              .slice(0, 3) // take only the first 3 jobs
              .map((application) => (
                <ApplicationRow key={application._id} app={application} />
              ))}
          </div>
        </section>
      </div>

      {/* Quick Actions */}
      <section className="mt-6">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          Quick Actions
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          {quickActions.map((qa) => (
            <QuickAction
              key={qa.id}
              label={qa.label}
              icon={qa.icon}
              onClick={() => {
                if (qa.id === "post") navigate("/companyDashboard/post-job");
                if (qa.id === "manage")
                  navigate("/companyDashboard/manage-jobs");
                if (qa.id === "applications")
                  navigate("/companyDashboard/applications");
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CompanyDashboard;
