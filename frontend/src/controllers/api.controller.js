import { fetchApplicationsByCompanyId, fetchJobPostsByCompanyId } from "../services/api.service";

 export const fetchJobs = async () => {
  const res = await fetchJobPostsByCompanyId();
  return res.data;
};

export const fetchApplications = async () => {
  const res = await fetchApplicationsByCompanyId();
  
  return res.data;
};