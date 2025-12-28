export const isUserLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token;
};
export const loggedUserData = () => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  return {
    token: token || null,
    user: userString ? JSON.parse(userString) : null,
  };
};

