
import React, { useState } from "react";

/* -------------------------------------------
 * Demo user (replace with API data)
 * ------------------------------------------- */
const demoUser = {
  id: "U-115084",
  name: "GUNATHUNGA G.M.C.S.",
  title: "Software Engineer · Taekwondo Athlete",
  location: "Southern Province, Sri Lanka",
  email: "user@example.com",
  phone: "+94 77 123 4567",
  website: "https://portfolio.example.com",
  about:
    "Full‑stack developer passionate about building clean UIs and scalable backends. Athletics background in Taekwondo; disciplined, reliable, and team‑oriented.",
  avatar: "https://i.pravatar.cc/160?img=12",
  resumeUrl: "#",
  social: {
    github: "https://github.com/username",
    linkedin: "https://www.linkedin.com/in/username",
    twitter: "https://x.com/username",
  },
  stats: {
    applied: 11,
    interviews: 3,
    offers: 1,
    saved: 7,
  },
  skills: [
    "Java",
    "Spring Boot",
    "React",
    "Tailwind CSS",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "REST & GraphQL",
  ],
  experience: [
    {
      id: "exp-1",
      role: "Software Engineer",
      company: "TechNova Solutions",
      location: "Remote",
      period: "2024 — Present",
      details: [
        "Built microservices in Java/Spring Boot with PostgreSQL and Redis.",
        "Shipped a React + Tailwind design system; improved UI delivery speed by 30%.",
        "Implemented CI/CD pipelines on GitHub Actions with Docker and K8s.",
      ],
    },
    {
      id: "exp-2",
      role: "Intern — Full Stack",
      company: "PixelForge Studios",
      location: "Colombo",
      period: "2023 — 2024",
      details: [
        "Developed REST/GraphQL APIs; wrote integration tests.",
        "Optimized DB queries; reduced API latency by ~40%.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "University of Sri Jayewardenepura",
      program: "BSc (Hons) in Computer Science",
      period: "2021 — 2025",
      highlights: ["Algorithms", "Distributed Systems", "Databases", "HCI"],
    },
  ],
};

/* -------------------------------------------
 * Inline icons (no external deps)
 * ------------------------------------------- */
const MailIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 8l9 6 9-6" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M6 4h4l2 4-3 2a12 12 0 006 6l2-3 4 2v4c0 1-1 2-2 2C8 21 3 16 3 6c0-1 1-2 3-2z" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const LocationIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 11a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const LinkIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M7 17a4 4 0 010-6l3-3a4 4 0 116 6l-1 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M17 7a4 4 0 010 6l-3 3a4 4 0 11-6-6l1-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const CalendarIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const CheckIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DownloadIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 3v10m0 0l-3-3m3 3l3-3M5 21h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* -------------------------------------------
 * Small UI helpers
 * ------------------------------------------- */
const Pill = ({ children, tone = "gray" }) => {
  const tones = {
    gray: "bg-gray-100 text-gray-800",
    gold: "bg-[#FFF7D1] text-[#7A5F00] ring-1 ring-[#F2D66B]",
    maroon: "bg-[#F3E5E7] text-[#800000] ring-1 ring-[#d3a3aa]",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
};

const StatCard = ({ label, value }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
  </div>
);

/* -------------------------------------------
 * Main component
 * ------------------------------------------- */
const Profile = ({ user = demoUser }) => {
  const [editable, setEditable] = useState(false);
  const [form, setForm] = useState({
    email: user.email,
    phone: user.phone,
    website: user.website,
    location: user.location,
    about: user.about,
  });

  const setField = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const saveChanges = () => {
    // TODO: call your API to save profile fields
    console.log("PROFILE UPDATE PAYLOAD:", { id: user.id, ...form });
    setEditable(false);
    alert("Profile updated (demo). Check console for payload.");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 m-16">
      {/* Header */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-5">
          <img
            src={user.avatar}
            alt={`${user.name} avatar`}
            className="h-24 w-24 rounded-2xl object-cover ring-1 ring-gray-200"
          />
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{user.name}</h1>
                <p className="text-sm text-gray-600">{user.title}</p>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Pill tone="maroon">
                    <span className="inline-flex items-center gap-1">
                      <LocationIcon className="w-4 h-4" />
                      {form.location}
                    </span>
                  </Pill>
                  <Pill tone="gold">
                    ID: {user.id}
                  </Pill>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!editable ? (
                  <button
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-50"
                    onClick={() => setEditable(true)}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-50"
                      onClick={() => setEditable(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="rounded-lg bg-[#800000] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6f0000]"
                      onClick={saveChanges}
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* About */}
            <div className="mt-4">
              {!editable ? (
                <p className="text-sm leading-relaxed text-gray-700">{form.about}</p>
              ) : (
                <textarea
                  value={form.about}
                  onChange={(e) => setField("about", e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-[#800000]"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <StatCard label="Applied" value={user.stats.applied} />
        <StatCard label="Interviews" value={user.stats.interviews} />
        <StatCard label="Offers" value={user.stats.offers} />
        <StatCard label="Saved Jobs" value={user.stats.saved} />
      </div>

      {/* Main grid */}
      <div className="mt-6 grid gap-6 md:grid-cols-[2fr_1fr]">
        {/* Left column */}
        <div className="space-y-6">
          {/* Contact & Links */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Contact & Links</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="text-sm text-gray-600">Email</label>
              {!editable ? (
                <p className="flex items-center gap-2 text-sm text-gray-800">
                  <MailIcon />
                  {form.email}
                </p>
              ) : (
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-[#800000]"
                />
              )}

              <label className="text-sm text-gray-600">Phone</label>
              {!editable ? (
                <p className="flex items-center gap-2 text-sm text-gray-800">
                  <PhoneIcon />
                  {form.phone}
                </p>
              ) : (
                <input
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-[#800000]"
                />
              )}

              <label className="text-sm text-gray-600">Website</label>
              {!editable ? (
                <a
                  href={form.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                >
                  <LinkIcon />
                  {form.website}
                </a>
              ) : (
                <input
                  value={form.website}
                  onChange={(e) => setField("website", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-[#800000]"
                />
              )}

              <label className="text-sm text-gray-600">Location</label>
              {!editable ? (
                <p className="flex items-center gap-2 text-sm text-gray-800">
                  <LocationIcon />
                  {form.location}
                </p>
              ) : (
                <input
                  value={form.location}
                  onChange={(e) => setField("location", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-[#800000]"
                />
              )}
            </div>
          </section>

          {/* Skills */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-full bg-[#FFF7D1] px-3 py-1 text-xs font-medium text-[#7A5F00] ring-1 ring-[#F2D66B]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Experience</h3>
              <Pill tone="maroon">Total: {user.experience.length}</Pill>
            </div>

            <div className="mt-3 space-y-4">
              {user.experience.map((exp) => (
                <div key={exp.id} className="rounded-xl border border-gray-200 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-base font-semibold text-gray-900">{exp.role}</p>
                      <p className="text-sm text-gray-600">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                      <CalendarIcon />
                      {exp.period}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {exp.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckIcon className="mt-0.5 w-4 h-4 text-[#800000]" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Education</h3>
            <div className="mt-3 space-y-4">
              {user.education.map((ed) => (
                <div key={ed.id} className="rounded-xl border border-gray-200 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-base font-semibold text-gray-900">{ed.school}</p>
                      <p className="text-sm text-gray-600">{ed.program}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                      <CalendarIcon />
                      {ed.period}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {ed.highlights.map((h) => (
                      <Pill key={h} tone="gray">{h}</Pill>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right sidebar */}
        <aside className="space-y-6">
          {/* Resume */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Resume</h3>
            <p className="mt-2 text-sm text-gray-700">
              Keep your resume up to date for faster applications.
            </p>
            <div className="mt-3 flex items-center gap-3">
              <a
                href={user.resumeUrl}
                className="inline-flex items-center gap-2 rounded-lg bg-[#800000] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6f0000]"
              >
                <DownloadIcon />
                Download
              </a>
              <button
                onClick={() => alert("Upload resume (demo)")}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-50"
              >
                Upload New
              </button>
            </div>
          </section>

          {/* Quick Summary */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Summary</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckIcon className="mt-0.5 w-4 h-4 text-[#D4AF37]" />
                <span>Strong in Java & React; comfortable with cloud-native stacks.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="mt-0.5 w-4 h-4 text-[#D4AF37]" />
                <span>Discipline and focus from Taekwondo athletic background.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="mt-0.5 w-4 h-4 text-[#D4AF37]" />
                <span>Open to Remote/Hybrid roles.</span>
              </li>
            </ul>
          </section>

          {/* Social links */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Social</h3>
            <div className="mt-3 grid gap-2">
              <a href={user.social.github} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">
                GitHub
              </a>
              <a href={user.social.linkedin} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">
                LinkedIn
              </a>
              <a href={user.social.twitter} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">
                X (Twitter)
              </a>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Profile;
