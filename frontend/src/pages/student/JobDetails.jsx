
import React from "react";

/* -------------------------------------------------
 * Demo job data (replace with API response)
 * ------------------------------------------------- */
const demoJob = {
  id: "J-2025-001",
  title: "Senior Software Engineer",
  company: {
    name: "TechNova Solutions",
    logo: "https://dummyimage.com/72x72/edf2f7/0d1b2a&text=TN",
    website: "https://technova.example.com",
    about:
      "TechNova Solutions builds cloud-native platforms and developer tools used by global teams. Our culture values impact, craftsmanship, and mentorship.",
    size: "201–500",
    industry: "IT & Software",
    location: "San Francisco, USA",
  },
  location: "San Francisco, USA",
  type: "Full-Time",
  category: "IT & Software",
  experience: "4–7 years",
  postedOn: "5th Jul 2025",
  salary: "$60k/m",
  benefits: [
    "Remote-friendly policy",
    "Health, dental & vision",
    "Annual learning budget",
    "ESOPs & performance bonus",
  ],
  description:
    "We’re seeking a Senior Software Engineer to design, build, and scale backend services and developer-facing APIs. You’ll collaborate cross-functionally with product, design, and infrastructure teams to deliver resilient features.",
  responsibilities: [
    "Design, implement, and maintain scalable microservices and REST/GraphQL APIs.",
    "Own end-to-end features from technical design through deployment and monitoring.",
    "Write clean, well-tested code and contribute to our shared libraries.",
    "Collaborate in architecture reviews; champion reliability and performance.",
    "Mentor junior engineers and participate in code reviews.",
  ],
  requirements: [
    "Strong proficiency in JavaScript/TypeScript or Java.",
    "Experience with Node.js/Express, or Spring Boot (microservices).",
    "Databases: PostgreSQL, Redis; messaging: Kafka or RabbitMQ.",
    "Cloud: AWS/GCP; containerization with Docker & Kubernetes.",
    "CI/CD pipelines; observability with Prometheus/Grafana.",
  ],

  /* Application-related demo fields */
  application: {
    status: "Under Review", // Possible: Submitted, Under Review, Interview Scheduled, Rejected, Offered
    submittedOn: "6th Jul 2025",
    referenceId: "APP-984213",
    notes:
      "Your application was received and is currently being reviewed by the hiring team.",
    nextSteps: ["You may be contacted for an initial screening.", "Watch for emails from careers@technova.example.com."],
  },
};

/* -------------------------------------------------
 * Small inline icons (no external deps)
 * ------------------------------------------------- */
const LocationIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 11a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const CalendarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const BriefcaseIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M9 7h6V5H9v2z" stroke="currentColor" strokeWidth="1.6" />
    <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 12h18" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const TagIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M21 11l-8.5 8.5a2 2 0 01-2.828 0L3 12.828a2 2 0 010-2.828L11.5 1.5H17a2 2 0 012 2v5.5z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <circle cx="15" cy="7" r="1.5" fill="currentColor" />
  </svg>
);

const SalaryIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path d="M9 9.5c0-1.5 1.2-2.5 3-2.5s3 .9 3 2.2c0 1.7-1.5 2.2-3 2.5s-3 .9-3 2.2 1.2 2.5 3 2.5 3-1 3-2.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 6v12" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const CheckIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* -------------------------------------------------
 * UI helpers
 * ------------------------------------------------- */
const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
    {children}
  </span>
);

const StatusPill = ({ status = "Submitted" }) => {
  const map = {
    Submitted: "bg-gray-100 text-gray-800 ring-1 ring-gray-200",
    "Under Review": "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    "Interview Scheduled": "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
    Offered: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    Rejected: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
  };
  const cls = map[status] || map.Submitted;
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${cls}`}>
      {status}
    </span>
  );
};

const Section = ({ title, children }) => (
  <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <div className="mt-3 space-y-3">{children}</div>
  </section>
);

/* -------------------------------------------------
 * Main component (without Apply buttons)
 * ------------------------------------------------- */
const JobDetails = ({ job = demoJob }) => {
  const app = job.application;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 m-16">
      {/* Hero */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <img
              src={job.company.logo}
              alt={`${job.company.name} logo`}
              className="h-16 w-16 rounded-xl object-cover ring-1 ring-gray-200"
            />
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{job.title}</h1>
              <p className="text-sm text-gray-600">{job.company.name}</p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Pill>
                  <span className="inline-flex items-center gap-1">
                    <LocationIcon className="w-4 h-4" />
                    {job.location}
                  </span>
                </Pill>
                <Pill>
                  <span className="inline-flex items-center gap-1">
                    <BriefcaseIcon className="w-4 h-4" />
                    {job.type}
                  </span>
                </Pill>
                <Pill>
                  <span className="inline-flex items-center gap-1">
                    <TagIcon className="w-4 h-4" />
                    {job.category}
                  </span>
                </Pill>
                <Pill>
                  <span className="inline-flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    Posted {job.postedOn}
                  </span>
                </Pill>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-blue-700 ring-1 ring-blue-200">
              <SalaryIcon className="w-5 h-5" />
              <span className="font-semibold">{job.salary}</span>
            </div>
            {/* Applied status (replaces Apply button) */}
            <StatusPill status={app?.status || "Submitted"} />
            <p className="text-xs text-gray-500">
              Applied on {app?.submittedOn} • Ref: {app?.referenceId}
            </p>
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="mt-6 grid gap-6 md:grid-cols-[2fr_1fr]">
        {/* Left column */}
        <div className="space-y-6">
          <Section title="Job Description">
            <p className="text-sm leading-relaxed text-gray-700">{job.description}</p>
          </Section>

          <Section title="Responsibilities">
            <ul className="space-y-2">
              {job.responsibilities.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckIcon className="mt-0.5 w-4 h-4 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Requirements">
            <ul className="space-y-2">
              {job.requirements.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckIcon className="mt-0.5 w-4 h-4 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Benefits">
            <div className="flex flex-wrap gap-2">
              {job.benefits.map((b, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200"
                >
                  {b}
                </span>
              ))}
            </div>
          </Section>
        </div>

        {/* Right sidebar: company + application status */}
        <aside className="space-y-6">
          {/* Company card */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src={job.company.logo}
                alt={`${job.company.name} logo`}
                className="h-12 w-12 rounded-xl object-cover ring-1 ring-gray-200"
              />
              <div>
                <h4 className="text-base font-semibold text-gray-900">{job.company.name}</h4>
                <p className="text-sm text-gray-600">{job.company.industry}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">Company Size:</span> {job.company.size}
              </p>
              <p className="flex items-center gap-1">
                <LocationIcon className="w-4 h-4" />
                {job.company.location}
              </p>
              <a
                href={job.company.website}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit Website
              </a>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-gray-700">{job.company.about}</p>

            <div className="mt-5">
              <button
                onClick={() => alert("Follow company (demo)")}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-50"
              >
                Follow Company
              </button>
            </div>
          </section>

          {/* Application status panel */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h4 className="text-base font-semibold text-gray-900">Application Status</h4>
            <div className="mt-3 flex items-center justify-between">
              <StatusPill status={app?.status || "Submitted"} />
              <span className="text-xs text-gray-500">Ref: {app?.referenceId}</span>
            </div>
            <p className="mt-3 text-sm text-gray-700">{app?.notes}</p>
            <ul className="mt-3 space-y-2">
              {(app?.nextSteps || []).map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckIcon className="mt-0.5 w-4 h-4 text-indigo-600" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                onClick={() => alert("Open resume (demo)")}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-50"
              >
                View Resume
              </button>
              <button
                onClick={() => alert("Withdraw application (demo)")}
                className="rounded-lg border border-rose-300 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm transition hover:bg-rose-100"
              >
                Withdraw
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default JobDetails;
