import {
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  ExternalLink,
  Upload,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import LoadingSnippet from "../../components/LoadingSnippet";
import {
  fetchLoggedUser,
  fetchStudentApplications,
} from "../../controllers/api.controller";

export const StudentProfile = () => {
  const {
    data: student = [],
    isLoading: studentLoading,
    isError: ProfileError,
  } = useQuery({
    queryKey: ["loggedInProfile"],
    queryFn: fetchLoggedUser,
  });
  const {
    data: appliedJobs = [],
    isLoading: appliedJobLoading,
    isError: appliedJobError,
  } = useQuery({
    queryKey: ["appliedJob"],
    queryFn: fetchStudentApplications,
  });

  if (studentLoading || appliedJobLoading) {
    return <LoadingSnippet />;
  }

  if (ProfileError || appliedJobError) {
    return toast.error(ProfileError?.message);
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleUpdateResume = () => {
    // Placeholder for real resume upload functionality
    // You can replace this with: file input, modal, or API call
    alert("Resume upload feature: Open file picker or modal to update resume!");
    // Example future implementation:
    // open file input or navigate to /profile/edit-resume
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-orange-200 flex items-center justify-center text-white text-4xl font-bold">
                {getInitials(student?.name)}
              </div>
            </div>

            {/* Main Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                {student?.name}
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                Student at {student?.university || "University"}
              </p>

              <p className="text-gray-700 mt-4 max-w-3xl">
                Passionate Computer Science student actively seeking internships
                and entry-level software engineering roles. Experienced in
                full-stack development, cloud technologies, and machine
                learning.
              </p>

              {/* Contact & Meta Info */}
              <div className="flex flex-wrap gap-6 mt-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <span>{student?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span>Open to relocation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span>Joined {formatDate(student?.createdAt)}</span>
                </div>
              </div>

              {/* Action Buttons: View Resume + Update Resume */}
              <div className="flex flex-wrap gap-4 mt-8">
                {student?.resume_url ? (
                  <a
                    href={student?.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View Current Resume
                  </a>
                ) : (
                  <span className="text-gray-500 italic">
                    No resume uploaded yet
                  </span>
                )}

                <button
                  onClick={handleUpdateResume}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium shadow-sm"
                >
                  <Upload className="w-5 h-5" />
                  Update Resume
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Skills</h2>
          {student?.skills && student.skills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {student?.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No skills listed yet.</p>
          )}
        </div>

        {/* Applied Jobs Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Applied Jobs ({appliedJobs.length})
          </h2>

          {appliedJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No applications yet. Explore jobs and start applying!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {appliedJobs.map((job) => (
                <div
                  key={job._id}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {job.job_title}
                      </h3>
                      <p className="text-gray-700 mt-1">{job.company_name}</p>

                      <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.job_location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.job_type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Applied on {formatDate(job.applied_at)}
                        </span>
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <span
                        className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                          job.status === "Under Review"
                            ? "bg-yellow-100 text-yellow-800"
                            : job.status === "Interview Scheduled"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
