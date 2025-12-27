import { VITE_API_BASE_URL } from "../../config/env.js";

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
