import { Button } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import {
  PencilIcon,
  XCircleIcon,
  TrashIcon,
  EyeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs, handleJobStatus } from "../../controllers/api.controller";
import LoadingSnippet from "../../components/LoadingSnippet";
import { toast } from "react-toastify";
import { useState } from "react";
import { deleteAJob } from "../../services/api.service";

export default function ManageJobs() {
  const navigate = useNavigate();
  const [loadingJobStatus, setLoadingJobs] = useState(null);

  const {
    data: jobs = [],
    isLoading: jobsLoading,
    isError: jobsError,
  } = useQuery({
    queryKey: ["companyJobs"],
    queryFn: fetchJobs,
  });

  if (jobsLoading) {
    return <LoadingSnippet />;
  }

  if (jobsError) {
    return toast.error(jobsError?.message);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 mt-[100px]">
        <div className="p-6 w-[80%] mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your job postings and track applications
          </p>
        </div>
        {/* Search + Add Button */}
        <div className="mb-6 w-[80%] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full sm:w-80 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition"
            />
            <select className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
              <option>All Status</option>
              <option>Active</option>
              <option>Closed</option>
            </select>
          </div>

          <Button
            onClick={() => navigate("/companyDashboard/post-job")}
            className="flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 px-6 py-3 text-white font-semibold shadow-md hover:opacity-90 transition"
          >
            <PlusIcon className="h-5 w-5" />
            Add New Job
          </Button>
        </div>

        <p className="mb-6 w-[80%] mx-auto text-sm text-gray-600">
          Showing {jobs.length} of {jobs.length} jobs
        </p>

        {/* Jobs Table */}
        <div className="overflow-hidden w-[80%] mx-auto rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Job Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Applicants
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[...jobs]
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

                .map((job) => (
                  <tr key={job._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-medium text-gray-900">{job.title}</p>
                        <p className="text-sm text-gray-500">{job.updatedAt}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full ${
                          job.status === "active"
                            ? "bg-green-200"
                            : "bg-red-100"
                        } px-3 py-1 text-xs font-semibold text-green-800`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          {[...Array(Math.min(job.applicationsCount, 3))].map(
                            (_, i) => (
                              <div
                                key={i}
                                className="h-8 w-8 rounded-full border-2 border-white bg-gray-300 ring-2 ring-gray-200"
                              />
                            )
                          )}
                          {job.applicationsCount > 3 && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600 ring-2 ring-white">
                              +{job.applicationsCount - 3}
                            </div>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {job.applicationsCount}{" "}
                          {job.applicationsCount === 1
                            ? "applicant"
                            : "applicants"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-8">
                        <button
                          onClick={() =>
                            navigate(
                              `/companyDashboard/${job._id}/update-jobs`,
                              {
                                state: { job: job },
                              }
                            )
                          }
                          className="text-indigo-600 hover:text-indigo-800 transition"
                          title="Edit"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>

                        {job.status === "active" ? (
                          <button
                            onClick={async () => {
                              try {
                                setLoadingJobs(job._id);
                                const res = await handleJobStatus({
                                  jobId: job._id,
                                  status: "closed",
                                });
                                if (res.success) {
                                  toast.success("Job closed successfully");
                                }
                              } catch (error) {
                                toast.error(error.message);
                              } finally {
                                setLoadingJobs(null);
                                window.location.reload();
                              }
                            }}
                            className="text-red-600 hover:text-red-800 transition"
                            title="Close Job"
                          >
                            {loadingJobStatus === job._id ? (
                              <h3>Loading ...</h3>
                            ) : (
                              <XCircleIcon className="h-5 w-5" />
                            )}
                          </button>
                        ) : (
                          <button
                            onClick={async () => {
                              try {
                                setLoadingJobs(job._id);
                                const res = await handleJobStatus({
                                  jobId: job._id,
                                  status: "active",
                                });
                                if (res.success) {
                                  toast.success("Job Activated successfully");
                                }
                              } catch (error) {
                                toast.error(error.message);
                              } finally {
                                setLoadingJobs(null);
                                window.location.reload();
                              }
                            }}
                            className="text-blue-600 hover:text-blue-800 transition"
                            title="View Job"
                          >
                            {loadingJobStatus === job._id ? (
                              <h3>Loading ...</h3>
                            ) : (
                              <EyeIcon className="h-5 w-5" />
                            )}
                          </button>
                        )}
                        <button
                          onClick={async () => {
                            try {
                              setLoadingJobs(job._id);
                              const res = await deleteAJob(job._id);
                              if (res.success) {
                                toast.success("Job Deleted successfully");
                              }
                            } catch (error) {
                              toast.error(error.message);
                            } finally {
                              setLoadingJobs(null);
                              window.location.reload();
                            }
                          }}
                          className="text-gray-600 hover:text-gray-800 transition"
                          title="Delete"
                        >
                          {loadingJobStatus === job._id ? (
                            <h3>Loading ...</h3>
                          ) : (
                            <TrashIcon className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
