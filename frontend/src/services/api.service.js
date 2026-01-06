import { toast } from "react-toastify";
import { VITE_API_BASE_URL } from "../../config/env.js";
import { loggedUserData } from "./auth.service.js";
const { token } = loggedUserData();

export async function loginUser({ email, password, role }) {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${VITE_API_BASE_URL}/api/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to sign in");
    }

    return data;
  } catch (err) {
    throw err;
  }
}
export async function registerUser({
  role,
  fullName,
  email,
  password,
  university,
  skills,
  resume_url,
  contactNumber,
}) {
  // eslint-disable-next-line no-useless-catch
  try {
    let body = {};

    if (role == "student") {
      body = {
        name: fullName,
        email,
        password,
        university,
        skills,
        profile_image: "",
        resume_url,
        role,
      };
    } else if (role == "company") {
      body = {
        name: fullName,
        email,
        password,
        contact_number: contactNumber,
        logo_url: "",
        role,
      };
    }

    const response = await fetch(`${VITE_API_BASE_URL}/api/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to Register");
    }

    return data;
  } catch (err) {
    throw err;
  }
}

export async function fetchJobPostsByCompanyId() {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${VITE_API_BASE_URL}/api/jobs/company`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();

    return data;
  } catch (err) {
    throw err;
  }
}
export async function fetchApplicationsByCompanyId() {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(
      `${VITE_API_BASE_URL}/api/applications/company`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    toast.success(data.message);
    return data;
  } catch (err) {
    toast.error(err.message);
    throw err;
  }
}

export async function postAJob(payload) {
  // eslint-disable-next-line no-useless-catch
  try {
    const requiredFields = ["title", "description"];
    for (const field of requiredFields) {
      if (!payload[field]?.trim()) {
        throw new Error(`Job ${field} is required`);
      }
    }

    const response = await fetch(`${VITE_API_BASE_URL}/api/jobs/company`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: payload.title,
        description: payload.description,
        location: payload.location,
        pay: payload.pay,
        hours: payload.hours,
        deadline: payload.deadline,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
}
export async function updateAJobPost(payload) {
  // eslint-disable-next-line no-useless-catch
  try {
    const jobId = payload.job_id;

    if (!jobId) {
      throw new Error("Job ID is required");
    }

    const response = await fetch(
      `${VITE_API_BASE_URL}/api/jobs/company/${jobId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobCategory: payload.jobCategory,
          description: payload.description,
          location: payload.location,
          pay: payload.pay,
          hours: payload.hours,
          deadline: payload.deadline,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
}
export async function updateAJobStatus(jobId, status) {
  // eslint-disable-next-line no-useless-catch
  try {
    if (!jobId) {
      throw new Error("Job ID is required");
    }

    const response = await fetch(
      `${VITE_API_BASE_URL}/api/jobs/company/${jobId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: status,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update job status");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
export async function deleteAJob(jobId) {
  // eslint-disable-next-line no-useless-catch
  try {
    if (!jobId) {
      throw new Error("Job ID is required");
    }

    const response = await fetch(
      `${VITE_API_BASE_URL}/api/jobs/company/${jobId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete job");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateApplicationStatusByCompany(applicationId, status) {
  // eslint-disable-next-line no-useless-catch
  try {
    if (!applicationId) {
      throw new Error("applicationId  is required");
    }

    const response = await fetch(
      `${VITE_API_BASE_URL}/api/applications/company/${applicationId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: status,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update application status");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
