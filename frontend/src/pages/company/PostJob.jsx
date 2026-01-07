import React, { useState } from "react";
import { postAJob } from "../../services/api.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

/** ------------------------------
 * Small inline icons
 * ------------------------------ */
const ChevronDown = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const Calendar = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V9h14v11z"
      fill="currentColor"
    />
  </svg>
);

const BackArrow = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M15 19l-7-7 7-7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** ------------------------------
 * UI helpers
 * ------------------------------ */
const FieldLabel = ({ children, required }) => (
  <label className="mb-1 block text-sm font-medium text-gray-800">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

const ErrorText = ({ children }) =>
  children ? <p className="mt-1 text-xs text-red-600">{children}</p> : null;

const Select = ({ value, onChange, placeholder, options, children }) => (
  <div className="relative">
    <select
      value={value}
      onChange={onChange}
      className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-9 text-sm text-gray-900 shadow-sm outline-none transition hover:bg-gray-50 focus:border-blue-600"
    >
      <option value="">{placeholder}</option>
      {children ||
        options?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
    </select>
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
      <ChevronDown />
    </span>
  </div>
);

const Textarea = ({ value, onChange, placeholder, rows = 6 }) => (
  <textarea
    value={value}
    onChange={onChange}
    rows={rows}
    placeholder={placeholder}
    className="w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-600"
  />
);

/** ------------------------------
 * Main component - Adapted to Job model
 * ------------------------------ */
const PostJob = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    pay: "",
    hours: "",
    deadline: "",
  });

  const [errors, setErrors] = useState({});

  const setField = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const e = {};

    if (!form.title.trim()) e.title = "Job title is required.";
    if (!form.description.trim() || form.description.trim().length < 20) {
      e.description =
        "Please provide a detailed job description (min 20 characters).";
    }

    const payNum = parseFloat(form.pay);
    if (form.pay && (isNaN(payNum) || payNum < 0)) {
      e.pay = "Please enter a valid positive salary amount.";
    }

    if (form.deadline && isNaN(Date.parse(form.deadline))) {
      e.deadline = "Please enter a valid date.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      pay: form.pay ? parseFloat(form.pay) : undefined,
      deadline: form.deadline
        ? new Date(form.deadline).toISOString()
        : undefined,
      // company_id will be added on the backend (from authenticated user)
      status: "active",
    };

    postAJob(payload)
      .then(() => {
        toast.success("Job created successfully!");
        navigate("/companyDashboard/manage-jobs");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 mt-16 mb-16">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50"
          onClick={() => window.history.back()}
        >
          <BackArrow />
          Back
        </button>
        <h2 className="text-xl font-semibold text-gray-900">Post a New Job</h2>
      </div>

      {/* Greeting */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">Welcome back!</p>
        <h1 className="mt-1 text-2xl font-semibold text-gray-900">
          Create a new job posting
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        {/* Job Name & Title */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <FieldLabel required>Job Title</FieldLabel>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              placeholder="e.g. Senior Frontend Engineer"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-blue-600"
            />
            <ErrorText>{errors.title}</ErrorText>
            <p className="mt-1 text-xs text-gray-500">
              Usually the same as Job Name
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-5">
          <FieldLabel required>Job Description</FieldLabel>
          <Textarea
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            placeholder="Describe the role, responsibilities, team, and what success looks like..."
            rows={8}
          />
          <ErrorText>{errors.description}</ErrorText>
        </div>

        {/* Location & Hours */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <FieldLabel>Location</FieldLabel>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setField("location", e.target.value)}
              placeholder="e.g. Colombo ,Malabe, Kandy"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <FieldLabel>Work Hours</FieldLabel>
            <Select
              value={form.hours}
              onChange={(e) => setField("hours", e.target.value)}
              placeholder="Select or type custom"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
            </Select>
          </div>
        </div>

        {/* Pay & Deadline */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <FieldLabel>Salary (USD)</FieldLabel>
            <input
              type="number"
              min="0"
              step="1000"
              value={form.pay}
              onChange={(e) => setField("pay", e.target.value)}
              placeholder="salary for day or hour"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-blue-600"
            />
            <ErrorText>{errors.pay}</ErrorText>
          </div>

          <div>
            <FieldLabel>Application Deadline</FieldLabel>
            <div className="relative">
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => setField("deadline", e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pl-10 text-sm text-gray-900 shadow-sm outline-none focus:border-blue-600"
              />
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Calendar />
              </span>
            </div>
            <ErrorText>{errors.deadline}</ErrorText>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={() =>
              setForm({
                name: "",
                title: "",
                description: "",
                location: "",
                pay: "",
                hours: "",
                deadline: "",
              })
            }
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            Reset
          </button>

          <button
            type="submit"
            onClick={handleSubmit}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60"
            disabled={!form.title || !form.description}
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
