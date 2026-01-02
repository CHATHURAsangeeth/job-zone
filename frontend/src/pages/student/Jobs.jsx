
import React, { useMemo, useState } from "react";

/* -------------------------------------------
 * Demo data: jobs the user has applied to
 * Replace with your API response.
 * ------------------------------------------- */
const demoAppliedJobs = [
  {
    id: "J-001",
    title: "Senior Software Engineer",
    company: "TechNova Solutions",
    location: "San Francisco, USA",
    type: "Full-Time",
    category: "IT & Software",
    postedOn: "5th Jul 2025",
    salary: "$60k/m",
    logo: "https://dummyimage.com/48x48/edf2f7/0d1b2a&text=M", // company mark
    saved: true,
  },
  {
    id: "J-002",
    title: "UX/UI Designer",
    company: "BlueGrid Technologies",
    location: "Berlin, Germany",
    type: "Full-Time",
    category: "Design",
    postedOn: "5th Jul 2025",
    salary: "$65k/m",
    logo: "https://dummyimage.com/48x48/edf2f7/0d1b2a&text=UX",
    saved: false,
  },
  {
    id: "J-003",
    title: "Sales Manager",
    company: "NeoHire Labs",
    location: "Toronto, Canada",
    type: "Contract",
    category: "Marketing & Sales",
    postedOn: "6th Jul 2025",
    salary: "$45k/m",
    logo: "https://dummyimage.com/48x48/edf2f7/0d1b2a&text=S",
    saved: true,
  },
  {
    id: "J-004",
    title: "Digital Marketing Specialist",
    company: "PixelForge Studios",
    location: "Remote",
    type: "Remote",
    category: "Marketing & Sales",
    postedOn: "7th Jul 2025",
    salary: "$40k/m",
    logo: "https://dummyimage.com/48x48/edf2f7/0d1b2a&text=D",
    saved: false,
  },
];

/* -------------------------------------------
 * Small inline icons (no external deps)
 * ------------------------------------------- */
const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
    <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const LocationIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 11a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const BookmarkIcon = ({ className = "w-5 h-5", filled = false }) => (
  <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"}>
    <path
      d="M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z"
      stroke="currentColor"
      strokeWidth={filled ? "0" : "1.6"}
    />
  </svg>
);

const CalendarIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

/* -------------------------------------------
 * UI subcomponents
 * ------------------------------------------- */
const Pill = ({ children, tone = "gray" }) => {
  const tones = {
    gray: "bg-gray-100 text-gray-700",
    green: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    blue: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
};

const JobCard = ({ job, onToggleSave }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-4">
      {/* Left: logo + title + company */}
      <div className="flex items-start gap-4">
        <img
          src={job.logo}
          alt={`${job.company} logo`}
          className="h-12 w-12 rounded-xl object-cover ring-1 ring-gray-200"
        />
        <div>
          <h3 className="text-base font-semibold text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.company}</p>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Pill>
              <span className="inline-flex items-center gap-1 text-xs text-gray-700">
                <LocationIcon className="w-4 h-4" />
                {job.location}
              </span>
            </Pill>
            <Pill tone="green">{job.type}</Pill>
            <Pill tone="gray">{job.category}</Pill>
          </div>

          <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1">
              <CalendarIcon />
              {job.postedOn}
            </span>
          </div>
        </div>
      </div>

      {/* Right: save + salary + applied */}
      <div className="flex flex-col items-end gap-3">
        <button
          type="button"
          className={`rounded-lg border px-2.5 py-2 transition ${
            job.saved
              ? "border-blue-600 text-blue-600 hover:bg-blue-50"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
          title={job.saved ? "Saved" : "Save job"}
          onClick={() => onToggleSave(job.id)}
        >
          <BookmarkIcon filled={job.saved} />
        </button>

        <div className="text-blue-600 font-semibold">{job.salary}</div>

        <span className="inline-flex items-center rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
          Applied
        </span>
      </div>
    </div>
  </div>
);

const SearchBar = ({ keyword, setKeyword, location, setLocation, onSearch }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
    <h2 className="text-xl font-semibold text-gray-900">Find Your Dream Job</h2>
    <p className="mt-1 text-sm text-gray-500">Discover opportunities that match your passion.</p>

    <div className="mt-4 grid gap-3 md:grid-cols-[1fr_320px_auto]">
      {/* Keyword */}
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <SearchIcon />
        </span>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Job title, company, or keywords"
          className="w-full rounded-xl border border-gray-300 bg-white pl-10 pr-3 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-600"
        />
      </div>

      {/* Location */}
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <LocationIcon />
        </span>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="w-full rounded-xl border border-gray-300 bg-white pl-10 pr-3 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-600"
        />
      </div>

      {/* Button */}
      <button
        onClick={onSearch}
        className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
      >
        Search Jobs
      </button>
    </div>
  </div>
);

/* -------------------------------------------
 * Page: Applied Jobs
 * ------------------------------------------- */
const Jobs = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState(demoAppliedJobs);

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    const loc = location.trim().toLowerCase();

    return jobs.filter((j) => {
      const inKeyword =
        !kw ||
        j.title.toLowerCase().includes(kw) ||
        j.company.toLowerCase().includes(kw) ||
        j.category.toLowerCase().includes(kw) ||
        j.type.toLowerCase().includes(kw);
      const inLocation = !loc || j.location.toLowerCase().includes(loc);
      return inKeyword && inLocation;
    });
  }, [keyword, location, jobs]);

  const toggleSave = (id) =>
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, saved: !j.saved } : j)));

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 m-16">
      {/* Search */}
      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        location={location}
        setLocation={setLocation}
        onSearch={() => {/* no-op: filtering is live; keep for future API trigger */}}
      />

      {/* Results header */}
      <div className="mt-5 flex items-center justify-between">
        <h3 className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filtered.length}</span> jobs
        </h3>

        {/* Layout toggles placeholder (grid/list icons) */}
        <div className="flex items-center gap-2">
          <button
            className="rounded-lg border border-gray-300 bg-white p-2 text-gray-700 shadow-sm hover:bg-gray-50"
            title="Grid view"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.6" />
              <rect x="13" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.6" />
              <rect x="3" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.6" />
              <rect x="13" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
          <button
            className="rounded-lg border border-gray-300 bg-white p-2 text-gray-700 shadow-sm hover:bg-gray-50"
            title="List view"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {filtered.map((job) => (
          <JobCard key={job.id} job={job} onToggleSave={toggleSave} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
