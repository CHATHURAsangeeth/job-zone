import { useState } from "react";
import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { isUserLoggedIn, loggedUserData } from "../services/auth.service";
import { Link, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Post a Job", href: "/companyDashboard/post-job" },
  { name: "Post Manage", href: "/companyDashboard/manage-jobs" },
  { name: "Applications", href: "/companyDashboard/applications" },
];

export const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let isLogginUser = isUserLoggedIn();
  const navigate = useNavigate();
  const { user } = isLogginUser ? loggedUserData() : { user: null };

  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <Link to="/" className="flex lg:flex-1 gap-1">
            <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto "
            />

            <span className="text-black font-semibold text-center text-2xl">
              Job Zone
            </span>
          </Link>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {user?.role === "company" &&
              navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-xl font-semibold text-gray-900"
                >
                  {item.name}
                </Link>
              ))}
          </div>
          {!isLogginUser ? (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-1">
              <Link
                to="/login"
                className="border rounded-md px-3 py-1 text-xl font-semibold text-gray-900 hover:bg-gray-100"
              >
                Log In
              </Link>

              <Link
                to="/register"
                className="border rounded-md px-3 py-1 bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 text-white text-xl font-semibold hover:text-black"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-1">
              <Button
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
                className="border rounded-md px-3 py-1 text-xl font-semibold text-gray-900 hover:bg-gray-100"
              >
                Log Out
              </Button>
              <Link
                to={user?.role === "company" ? "/companyDashboard" : "/profile"}
                className="border rounded-md px-3 py-1 bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 text-white text-xl font-semibold hover:text-black"
              >
                Profile
              </Link>
            </div>
          )}
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Job Zone</span>
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                {!isLogginUser ? (
                  <div className="py-6">
                    <Link
                      to="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Log In
                    </Link>

                    <Link
                      to="/register" // changed from <a> to <Link>
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-1">
                    <Button
                      onClick={() => {
                        localStorage.clear();
                        navigate("/");
                      }}
                      className="border rounded-md px-3 py-1 text-xl font-semibold text-gray-900 hover:bg-gray-100"
                    >
                      Log Out
                    </Button>
                    <Link
                      to={
                        user?.role === "company"
                          ? "/companyDashboard"
                          : "/profile"
                      }
                      className="border rounded-md px-3 py-1 bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 text-white text-xl font-semibold hover:text-black"
                    >
                      Profile
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
};

export default NavBar;
