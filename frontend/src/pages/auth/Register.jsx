
import { useState } from "react";

const roles = [
  {
    id: "seeker",
    title: "Job Seeker",
    subtitle: "Looking for opportunities",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 0116 0"
        />
      </svg>
    ),
  },
  {
    id: "employer",
    title: "Employer",
    subtitle: "Hiring talent",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7h18M6 10h12M8 13h8M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

export default function RegisterCard() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employer"); // default like screenshot
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword , setShowPassword] = useState(true);

  const onPickPhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValidType =
      file.type === "image/jpeg" || file.type === "image/png";
    const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB

    if (!isValidType) {
      setError("Please upload a JPG or PNG image.");
      return;
    }
    if (!isValidSize) {
      setError("Image must be 5MB or smaller.");
      return;
    }

    setError("");
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1200));
      alert(
        `Account created for ${fullName} (${role}).${
          photoFile ? " Profile photo attached." : ""
        }`
      );
    } catch (err) {
      setError("Something went wrong. Please try again.error - ",err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 mt-8">
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
                     bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30
                     sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="w-full max-w-md p-3">
        <div className="rounded-2xl bg-white shadow-soft ring-1 ring-black/5 p-8">
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name *
              </label>
              <div className="mt-2 relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  {/* user icon */}
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
                      d="M12 13a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 0116 0"
                    />
                  </svg>
                </span>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
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
                Email Address *
              </label>
              <div className="mt-2 relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  {/* mail icon */}
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
                  placeholder="Enter your email"
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
                Password *
              </label>
              <div className="mt-2 relative ">
                <span  className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  {/* lock icon */}
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
                  placeholder="Create a strong password"
                  className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 py-2.5 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

            {/* Profile Picture (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Picture (Optional)
              </label>
              <div className="mt-2 flex items-center gap-3">
                {/* Preview avatar */}
                <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden ring-1 ring-gray-300 flex items-center justify-center">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 13a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 0116 0"
                      />
                    </svg>
                  )}
                </div>

                <label className="flex-1">
                  <div className="w-full inline-flex items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 shadow-sm cursor-pointer hover:bg-gray-50">
                    <span className="inline-flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 5v14M5 12h14"
                        />
                      </svg>
                      Upload Photo
                    </span>
                    <span className="text-xs text-gray-400">
                      JPG, PNG up to 5MB
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={onPickPhoto}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            {/* Role selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                I am a *
              </label>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {roles.map((r) => {
                  const selected = role === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={[
                        "rounded-xl border p-4 text-left transition",
                        selected
                          ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50"
                          : "border-gray-300 hover:bg-gray-50",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "flex items-center gap-3",
                          selected ? "text-blue-600" : "text-gray-700",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "inline-flex items-center justify-center h-10 w-10 rounded-lg border",
                            selected
                              ? "border-blue-300 bg-white"
                              : "border-gray-300 bg-white",
                          ].join(" ")}
                        >
                          {r.icon}
                        </span>
                        <div>
                          <div className="font-semibold">{r.title}</div>
                          <div className="text-xs text-gray-500">
                            {r.subtitle}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
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
                background:
                  "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)", // blue → purple
                boxShadow: "0 6px 14px rgba(99,102,241,0.35)",
              }}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

            {/* Bottom link */}
            <p className="text-center text-sm text-gray-500">
              
              Already have an account?{" "}
              <a href="">
                Sign in here
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

/** Password Input (with show/hide eye icon) */
function PasswordInput({ value, onChange, placeholder }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <input
        id="password"
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-10 py-2.5 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? (
          // Eye-off
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
          // Eye
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
      
    </>
  );
}
