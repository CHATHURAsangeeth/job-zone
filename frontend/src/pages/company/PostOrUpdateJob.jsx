import { updateAJobPost } from "../../services/api.service";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

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

const PostOrUpdateJob = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jobFromState = location.state?.job || {};
  const [errors, setErrors] = useState({});
  const [qualificationInput, setQualificationInput] = useState("");

  const [form, setForm] = useState({
    jobCategory: jobFromState.jobCategory ?? "",
    title: jobFromState.title ?? "",
    description: jobFromState.description ?? "",
    location: jobFromState.location ?? "",
    pay: jobFromState.pay ?? 0,
    hours: jobFromState.hours ?? "",
    deadline: jobFromState.deadline
      ? new Date(jobFromState.deadline).toISOString().split("T")[0]
      : "",
    qualifications: jobFromState.qualifications ?? [], // <-- added qualifications
  });

  console.log(form.jobCategory);
  

  const setField = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };


  const addQualification = () => {
    const trimmed = qualificationInput.trim();
    if (trimmed && !form.qualifications.includes(trimmed)) {
      setForm((prev) => ({
        ...prev,
        qualifications: [...prev.qualifications, trimmed],
      }));
      setQualificationInput("");
    }
  };

  const removeQualification = (index) => {
    setForm((prev) => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index),
    }));
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
      job_id: jobFromState._id,
      pay: form.pay ? parseFloat(form.pay) : undefined,
      deadline: form.deadline
        ? new Date(form.deadline).toISOString()
        : undefined,
      status: "active",
    };

    updateAJobPost(payload)
      .then(() => {
        toast.success("Job Updated successfully!");
        navigate("/companyDashboard/manage-jobs");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 mt-16 mb-16">
      {/* Greeting */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">Welcome back!</p>
        <h1 className="mt-1 text-2xl font-semibold text-gray-900">
          Update Your Job
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        {/* Job Title & Category */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <FieldLabel required>Job Title</FieldLabel>
            <input
              type="text"
              value={form.title}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-red-600 shadow-sm outline-none focus:border-blue-600"
              disabled
            />
            <ErrorText>{errors.title}</ErrorText>
          </div>

          <div>
            <FieldLabel required>Job Category</FieldLabel>
            <input
              type="text"
              value={form.jobCategory}
              onChange={(e) => setField("jobCategory", e.target.value)}
              placeholder="e.g. IT"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-blue-600"
            />
            <ErrorText>{errors.jobCategory}</ErrorText>
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

        {/* Qualifications */}
        <div className="mt-5">
          <FieldLabel>Qualifications</FieldLabel>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={qualificationInput}
              onChange={(e) => setQualificationInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addQualification();
                }
              }}
              placeholder="Type a qualification and press Enter"
              className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addQualification}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.qualifications.map((q, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center gap-1"
              >
                {q}
                <button
                  type="button"
                  onClick={() => removeQualification(index)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Location & Hours */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <FieldLabel>Location</FieldLabel>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setField("location", e.target.value)}
              placeholder="e.g. Colombo, Malabe, Kandy"
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
                jobCategory: "",
                description: "",
                location: "",
                pay: "",
                hours: "",
                deadline: "",
                qualifications: [],
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
            Update Job Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostOrUpdateJob;
