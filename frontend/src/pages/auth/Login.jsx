import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState("student");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Simple front-end validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      // Simulate sign-in API call
      await new Promise((res) => setTimeout(res, 1000));
      alert(`Signed in as ${email}`);
    } catch (err) {
      setError("Something went wrong. Please try again.error-", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      {/* 🔹 TOP BACKGROUND GRADIENT (FULL WIDTH) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678]
                     w-[36.125rem] -translate-x-1/2 rotate-[30deg]
                     bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-50
                     sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white shadow-soft ring-1 ring-black/5 p-8">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-black">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Sign in to your Job Zone account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            {/* Role Selection */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Select Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="student">Student</option>
                <option value="company">Company</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-2 relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  {/* Mail icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7.5l8.485 6.364a2 2 0 002.53 0L22.5 7.5M4.5 6A2.5 2.5 0 002 8.5v7A2.5 2.5 0 004.5 18h15a2.5 2.5 0 002.5-2.5v-7A2.5 2.5 0 0019.5 6h-15z"
                    />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="company4@timetoprogram.com"
                  className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 py-2.5 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-2 relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  {/* Mail icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7.5l8.485 6.364a2 2 0 002.53 0L22.5 7.5M4.5 6A2.5 2.5 0 002 8.5v7A2.5 2.5 0 004.5 18h15a2.5 2.5 0 002.5-2.5v-7A2.5 2.5 0 0019.5 6h-15z"
                    />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="company4@timetoprogram.com"
                  className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 py-2.5 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-2 relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  {/* Lock icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 10V8a4 4 0 10-8 0v2M5 10h14v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8z"
                    />
                  </svg>
                </span>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-10 py-2.5 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                {/* Show/Hide toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-3 h-2 w-auto right-0 flex items-center bg-white text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    // Eye-off icon
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3l18 18M10.585 10.585A3 3 0 0112 9a3 3 0 013 3c0 .414-.084.808-.237 1.164M7.153 7.153C4.906 8.396 3.36 10.21 2.5 12c1.8 3.6 6 6 9.5 6 1.47 0 2.87-.322 4.13-.903M16.848 16.848C19.094 15.604 20.64 13.79 21.5 12c-1.8-3.6-6-6-9.5-6-.646 0-1.274.06-1.882.175"
                      />
                    </svg>
                  ) : (
                    // Eye icon
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.5 12c1.8-3.6 6-6 9.5-6s7.7 2.4 9.5 6c-1.8 3.6-6 6-9.5 6S4.3 15.6 2.5 12z"
                      />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg py-2.5 font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60"
              style={{
                background: "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)", // blue → purple gradient like the screenshot
                boxShadow: "0 6px 14px rgba(99,102,241,0.35)",
              }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {/* Footer link */}
            <p className="text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Create one here
              </a>
            </p>
          </form>
        </div>
      </div>
      {/* 🔹 BOTTOM BACKGROUND GRADIENT (FULL WIDTH) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10
                   transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678]
                     w-[36.125rem] -translate-x-1/2
                     bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30
                     sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  );
}
