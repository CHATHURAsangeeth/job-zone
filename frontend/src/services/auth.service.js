export const isUserLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const loggedUserData = () => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  let user = null;

  try {
    user = userString ? JSON.parse(userString) : null;
  } catch (error) {
    console.error("Invalid user JSON in localStorage", error);
    localStorage.removeItem("user"); // cleanup
  }

  return {
    token: token || null,
    user,
  };
};
