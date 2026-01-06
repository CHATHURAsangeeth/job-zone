import {
  fetchApplicationsByCompanyId,
  fetchJobPostsByCompanyId,
  updateAJobStatus,
  updateApplicationStatusByCompany,
} from "../services/api.service";

export const fetchJobs = async () => {
  const res = await fetchJobPostsByCompanyId();
  return res.data;
};

export const fetchApplications = async () => {
  const res = await fetchApplicationsByCompanyId();

  return res.data;
};

export const handleJobStatus = async ({ jobId, status }) => {
  const res = await updateAJobStatus(jobId, status);
  return res;
};
export const handleApplicationStatus = async ({ applicationId, status }) => {
  const res = await updateApplicationStatusByCompany(applicationId, status);
  return res;
};
