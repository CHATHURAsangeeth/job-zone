import { useNavigate, useLocation } from "react-router-dom";
import { MapPin, Clock, Briefcase } from "lucide-react";
import { isUserLoggedIn } from "../../services/auth.service.js";
import { studentApplyForJob } from "../../services/api.service.js";
import { toast } from "react-toastify";
import { useState } from "react";

export default function JobDetails() {
  //const { id } = useParams();
  const [applyJobLoading, setApplyJobLoading] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = isUserLoggedIn();
  const location = useLocation();
  const job = location.state?.job;

  const handleApply = async () => {
    if (isLoggedIn) {
      try {
        setApplyJobLoading(job._id);
        const res = await studentApplyForJob(job._id);
        if (res.success) {
          toast.success("Successfully applied for job");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setApplyJobLoading(null);
      }
    } else {
      navigate("/login");
    }
  };

  const formatDate = (date) => {
    const diffTime = Math.abs(new Date("2026-01-07") - new Date(date));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days left`;
  };

  if (!job) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 mt-20">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <p className="text-xl text-blue-600 font-semibold mb-6">
                {job.name}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {job.location}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {formatDate(job.deadline)}
                </span>
                <span className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  {job.hours}
                </span>
              </div>

              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-8">{job.description}</p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  QUALIFICATION:
                </h2>
                <ul className="space-y-3 text-gray-700">
                  {job.qualifications?.map((qual, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-3">•</span>
                      {qual}
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <p className="font-semibold text-gray-900">
                    Location: {job.location}
                  </p>
                </div>

                <div className="mt-10">
                  <p className="text-lg font-bold text-gray-900 uppercase">
                    Please click the apply button to send your CV via XpressJobs
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Card */}
          <div className="lg:col-span-1 mt-[150px]">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              {/* Company Logo */}
              <div className="flex justify-center mb-4">
                <div className="w-32 h-20 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-3xl font-bold text-orange-600">
                    {job.name.split(" ").map((word)=> word.charAt(0)).join("")}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-center mb-2">
                {job.title}
              </h3>
              <p className="text-center text-gray-600 mb-6">{job.name}</p>

              <div className="space-y-3 text-sm text-gray-600 border-b pb-6">
                <div className="flex justify-between">
                  <span>Education</span>
                  <span className="font-medium">Relevant Qualification</span>
                </div>
                <div className="flex justify-between">
                  <span>Experience</span>
                  <span className="font-medium">5+ years</span>
                </div>
                <div className="flex justify-between">
                  <span>Salary Range</span>
                  <span className="font-medium">Any</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleApply}
                  className="w-full py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                >
                  {applyJobLoading === job._id ? (
                    <h3>Loading ...</h3>
                  ) : (
                    <h3>APPLY FOR JOB</h3>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
