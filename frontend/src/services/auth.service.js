export const isUserLoggedIn = () => {
  const token = localStorage.getItem('authToken');
  return !!token;
}