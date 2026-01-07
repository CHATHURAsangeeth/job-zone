import { MapPin, Bookmark, BookmarkCheck } from "lucide-react";
import { isUserLoggedIn } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function JobCard({
  job,
  isSaved,
  formatPay,
  formatDate,
}) {
  const isLogginUser = isUserLoggedIn();
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 font-bold">
          {job.name.charAt(0)}
        </div>
        <button className="text-gray-400 hover:text-blue-600">
          {isSaved ? (
            <BookmarkCheck className="w-6 h-6 fill-blue-600 text-blue-600" />
          ) : (
            <Bookmark className="w-6 h-6" />
          )}
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
      <p className="text-gray-600 mb-4">{job.name}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-1" /> {job.location || "Remote"}
        </span>
        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
          {job.hours || "Full-Time"}
        </span>
        <span className="text-sm text-gray-600">{job.jobCategory}</span>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {job.description}
      </p>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            Deadline: {job.deadline ? formatDate(job.deadline) : "Open"}
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            ${formatPay(job.pay)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {job.applicationsCount} applications
          </p>
        </div>

        <button
          onClick={() => {
            isLogginUser
              ? navigate(`/jobs/${job._id}`, { state: { job } })
              : navigate("/login");
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg
             hover:bg-blue-700 transition"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
