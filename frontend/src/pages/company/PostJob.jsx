
import React, { useState } from "react";

/** ------------------------------
 * Demo option lists (replace with your API data)
 * ------------------------------ */
const CATEGORIES = [
  "IT & Software",
  "Finance",
  "Marketing & Sales",
  "Design",
  "Human Resources",
  "Operations",
  "Product",
];

const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Remote",
];

/** ------------------------------
 * Small inline icons
 * ------------------------------ */
const ChevronDown = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const Dollar = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3v18M16.5 7.5a4 4 0 00-8 0c0 2.5 4 3 4 3s4 .5 4 3a4 4 0 01-8 0"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BackArrow = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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

const Select = ({ value, onChange, placeholder, options }) => (
  <div className="relative">
    <select
      value={value}
      onChange={onChange}
      className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-9 text-sm text-gray-900 shadow-sm outline-none transition hover:bg-gray-50 focus:border-blue-600"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
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

const CurrencyInput = ({ value, onChange, placeholder }) => (
  <div className="relative">
    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
      <Dollar />
    </span>
    <input
      inputMode="decimal"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-600"
    />
  </div>
);

/** ------------------------------
 * Main component
 * ------------------------------ */
const PostJob = () => {
  const [form, setForm] = useState({
    category: "",
    jobType: "",
    description: "",
    requirements: "",
    minSalary: "",
    maxSalary: "",
  });

  const [errors, setErrors] = useState({});

  const setField = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const e = {};

    if (!form.category) e.category = "Please select a category.";
    if (!form.jobType) e.jobType = "Please select a job type.";

    if (!form.description || form.description.trim().length < 10) {
      e.description = "Please provide a meaningful job description (min 10 chars).";
    }

    if (!form.requirements || form.requirements.trim().length < 10) {
      e.requirements = "Please list key qualifications (min 10 chars).";
    }

    const min = parseFloat(form.minSalary);
    const max = parseFloat(form.maxSalary);

    if (Number.isNaN(min)) e.minSalary = "Enter a valid minimum salary.";
    if (Number.isNaN(max)) e.maxSalary = "Enter a valid maximum salary.";
    if (!Number.isNaN(min) && !Number.isNaN(max) && min > max) {
      e.maxSalary = "Max should be greater than or equal to Min.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Prepare payload (replace with API call)
    const payload = {
      ...form,
      minSalary: parseFloat(form.minSalary),
      maxSalary: parseFloat(form.maxSalary),
      createdAt: new Date().toISOString(),
    };

    console.log("POST JOB PAYLOAD:", payload);
    alert("Job posted (demo). Check console for payload.");
    // Reset form (optional)
    // setForm({ category: "", jobType: "", description: "", requirements: "", minSalary: "", maxSalary: "" });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 mt-16 mb-16">
      {/* Header row with back button + title */}
      <div className="mb-5 flex items-center gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50"
          onClick={() => window.history.back()}
        >
          <BackArrow />
          Back
        </button>

        <h2 className="text-xl font-semibold text-gray-900">
          Post Job
        </h2>
      </div>

      {/* Greeting */}
      <div className="mb-4">
        <p className="text-sm text-gray-500">Welcome back!</p>
        <h1 className="mt-1 text-2xl font-semibold text-gray-900">
          Here’s what’s happening with your jobs today.
        </h1>
      </div>

      {/* Form card */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
      >
        {/* Top row: Category + Job type */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <FieldLabel required>Select a category</FieldLabel>
            <Select
              value={form.category}
              onChange={(e) => setField("category", e.target.value)}
              placeholder="Select a category"
              options={CATEGORIES}
            />
            <ErrorText>{errors.category}</ErrorText>
          </div>

          <div>
            <FieldLabel required>Select job type</FieldLabel>
            <Select
              value={form.jobType}
              onChange={(e) => setField("jobType", e.target.value)}
              placeholder="Select job type"
              options={JOB_TYPES}
            />
            <ErrorText>{errors.jobType}</ErrorText>
          </div>
        </div>

        {/* Job Description */}
        <div className="mt-5">
          <FieldLabel required>Job Description</FieldLabel>
          <Textarea
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            placeholder="Describe the role and responsibilities..."
            rows={8}
          />
          <p className="mt-1 text-xs text-gray-500">
            Include key responsibilities, day-to-day tasks, and what makes this role exciting.
          </p>
          <ErrorText>{errors.description}</ErrorText>
        </div>

        {/* Requirements */}
        <div className="mt-5">
          <FieldLabel required>Requirements</FieldLabel>
          <Textarea
            value={form.requirements}
            onChange={(e) => setField("requirements", e.target.value)}
            placeholder="List key qualifications and skills..."
            rows={6}
          />
          <p className="mt-1 text-xs text-gray-500">
            Include required skills, experience level, education, and any preferred qualifications.
          </p>
          <ErrorText>{errors.requirements}</ErrorText>
        </div>

        {/* Salary Range */}
        <div className="mt-5">
          <FieldLabel required>Salary Range</FieldLabel>
          <div className="grid gap-3 md:grid-cols-2">
            <CurrencyInput
              value={form.minSalary}
              onChange={(e) => setField("minSalary", e.target.value)}
              placeholder="Min"
            />
            <CurrencyInput
              value={form.maxSalary}
              onChange={(e) => setField("maxSalary", e.target.value)}
              placeholder="Max"
            />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <ErrorText>{errors.minSalary}</ErrorText>
            <ErrorText>{errors.maxSalary}</ErrorText>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-50"
            onClick={() =>
              setForm({
                category: "",
                jobType: "",
                description: "",
                requirements: "",
                minSalary: "",
                maxSalary: "",
              })
            }
          >
            Reset
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60"
            disabled={
              !form.category ||
              !form.jobType ||
              !form.description ||
              !form.requirements ||
              !form.minSalary ||
              !form.maxSalary
            }
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;

