/**
 * DatasetFilter — Demo & Test Page
 *
 * This file shows three usage examples of the DatasetFilter package:
 *   1. Static data (pass `data` prop directly)
 *   2. URL dataset (pass `dataset` prop — a remote JSON URL)
 *   3. Custom queryFn (pass `queryFn` + `queryKey`)
 *
 * The schema drives every filter automatically.
 * Drop this file into your project, adjust import paths, and run.
 */

// import { DatasetFilter } from "@/app/components/src";
import { useState } from "react";
import { DatasetFilter } from "@ankamala/ui-libraries/dataset-filter";         

// ─────────────────────────────────────────────
// 1.  SAMPLE DATA  (used in Example A)
// ─────────────────────────────────────────────
const SAMPLE_JOBS = [
  { id: 1,  title: "Frontend Engineer",        company: "Stripe",     location: "Remote",        salary: 130000, type: "Full-time",  remote: true,  tags: ["React", "TypeScript"] },
  { id: 2,  title: "Backend Engineer",         company: "Vercel",     location: "San Francisco", salary: 145000, type: "Full-time",  remote: false, tags: ["Node.js", "Go"] },
  { id: 3,  title: "Product Designer",         company: "Linear",     location: "Remote",        salary: 115000, type: "Full-time",  remote: true,  tags: ["Figma", "UX"] },
  { id: 4,  title: "DevOps Engineer",          company: "Cloudflare", location: "Austin",        salary: 138000, type: "Full-time",  remote: false, tags: ["Kubernetes", "Terraform"] },
  { id: 5,  title: "Data Scientist",           company: "OpenAI",     location: "San Francisco", salary: 165000, type: "Full-time",  remote: false, tags: ["Python", "ML"] },
  { id: 6,  title: "iOS Developer",            company: "Figma",      location: "Remote",        salary: 128000, type: "Contract",   remote: true,  tags: ["Swift", "SwiftUI"] },
  { id: 7,  title: "ML Engineer",              company: "Anthropic",  location: "San Francisco", salary: 180000, type: "Full-time",  remote: false, tags: ["Python", "PyTorch"] },
  { id: 8,  title: "Technical Writer",         company: "HashiCorp",  location: "Remote",        salary: 95000,  type: "Part-time",  remote: true,  tags: ["Docs", "Markdown"] },
  { id: 9,  title: "Security Engineer",        company: "Cloudflare", location: "Austin",        salary: 152000, type: "Full-time",  remote: false, tags: ["Rust", "Networking"] },
  { id: 10, title: "Full-stack Engineer",      company: "Vercel",     location: "Remote",        salary: 140000, type: "Full-time",  remote: true,  tags: ["Next.js", "TypeScript"] },
  { id: 11, title: "Android Developer",        company: "Stripe",     location: "New York",      salary: 135000, type: "Full-time",  remote: false, tags: ["Kotlin", "Jetpack"] },
  { id: 12, title: "Infra Engineer",           company: "Linear",     location: "Remote",        salary: 148000, type: "Contract",   remote: true,  tags: ["Kubernetes", "Go"] },
];

// ─────────────────────────────────────────────
// 2.  SCHEMA  (shared by all examples)
// ─────────────────────────────────────────────
const JOB_SCHEMA = {
  // full-text search across multiple fields
  search: {
    type: "search",
    placeholder: "Search by title, company or tag…",
    fields: ["title", "company", "tags"],
  },

  // standalone boolean checkbox (goes into "General" group automatically)
  remote: {
    type: "checkbox",
    label: "Remote only",
    field: "remote",
  },

  // grouped filters rendered under one collapsible section
  jobDetails: {
    type: "group",
    label: "Job Details",
    children: ["type", "location"],
    childrenSchema: {
      type: {
        type: "checkbox-group",
        label: "Employment type",
        field: "type",
        options: ["Full-time", "Part-time", "Contract"],
      },
      location: {
        type: "checkbox-group",
        label: "Location",
        field: "location",
        // options are auto-extracted from data when omitted
      },
    },
  },

  // salary range filter
  salary: {
    type: "range",
    label: "Salary (USD)",
    field: "salary",
    ranges: [
      { label: "< $100k",         min: 0,      max: 99999  },
      { label: "$100k – $130k",   min: 100000, max: 130000 },
      { label: "$130k – $150k",   min: 130001, max: 150000 },
      { label: "> $150k",         min: 150001, max: Infinity },
    ],
  },

  // tags — array field on each item
  tags: {
    type: "checkbox-group",
    label: "Tech Stack",
    field: "tags",
    isArray: true,
    // options auto-extracted from data
  },
};

// ─────────────────────────────────────────────
// 3.  RENDER CONTENT — job card grid
// ─────────────────────────────────────────────
const JobCard = ({ job }) => (
  <article
    style={{
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: 10,
      padding: "20px 22px",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      boxShadow: "0 1px 3px rgba(0,0,0,.06)",
      transition: "box-shadow .15s",
    }}
    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,.1)"}
    onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,.06)"}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#111" }}>{job.title}</h3>
        <p  style={{ margin: "2px 0 0", fontSize: 13, color: "#6b7280" }}>{job.company} · {job.location}</p>
      </div>
      <span style={{
        fontSize: 11, fontWeight: 600, padding: "3px 10px",
        borderRadius: 20, background: job.remote ? "#dcfce7" : "#f3f4f6",
        color: job.remote ? "#16a34a" : "#6b7280",
      }}>
        {job.remote ? "Remote" : "On-site"}
      </span>
    </div>

    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {job.tags.map(t => (
        <span key={t} style={{
          fontSize: 11, padding: "2px 8px", borderRadius: 4,
          background: "#eff6ff", color: "#2563eb", fontWeight: 500,
        }}>{t}</span>
      ))}
    </div>

    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
      <span style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>
        ${job.salary.toLocaleString()} / yr
      </span>
      <span style={{
        fontSize: 11, padding: "2px 10px", border: "1px solid #e5e7eb",
        borderRadius: 20, color: "#374151",
      }}>{job.type}</span>
    </div>
  </article>
);

const renderJobContent = ({ filteredData, totalData }) => (
  <div>
    <p style={{ marginBottom: 16, fontSize: 13, color: "#6b7280" }}>
      Showing <strong style={{ color: "#111" }}>{filteredData.length}</strong> of {totalData.length} jobs
    </p>

    {filteredData.length === 0 ? (
      <div style={{
        textAlign: "center", padding: "60px 0", color: "#9ca3af",
        border: "2px dashed #e5e7eb", borderRadius: 12,
      }}>
        <p style={{ fontSize: 18, marginBottom: 6 }}>No jobs match your filters</p>
        <p style={{ fontSize: 13 }}>Try adjusting or removing some filters</p>
      </div>
    ) : (
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
        gap: 16,
      }}>
        {filteredData.map(job => <JobCard key={job.id} job={job} />)}
      </div>
    )}
  </div>
);

// ─────────────────────────────────────────────
// 4.  EXAMPLE TABS
// ─────────────────────────────────────────────
const TABS = [
  { id: "static",   label: "A · Static data",          desc: 'Pass a plain JS array via the "data" prop.' },
  { id: "url",      label: "B · URL dataset",           desc: 'Pass a remote JSON URL via the "dataset" prop. DatasetFilter fetches + caches it.' },
  { id: "queryfn",  label: "C · Custom queryFn",        desc: 'Full control: supply your own async function + queryKey.' },
];

// Public JSON used for examples B & C
const REMOTE_URL = "https://jsonplaceholder.typicode.com/users";

// Transform the /users response into something we can filter
const transformUsers = (users) =>
  (users || []).map((u) => ({
    id: u.id,
    title: u.name,
    company: u.company.name,
    location: u.address.city,
    salary: 80000 + u.id * 7000,
    type: u.id % 3 === 0 ? "Contract" : "Full-time",
    remote: u.id % 2 === 0,
    tags: [u.website.split(".")[0], "REST"],
  }));

// ─────────────────────────────────────────────
// 5.  PAGE
// ─────────────────────────────────────────────
export default function DatasetFilterDemoPage() {
  const [activeTab, setActiveTab] = useState("static");

  return (
    <div style={{ fontFamily: "'Geist', 'Inter', sans-serif", minHeight: "100vh", background: "#f9fafb" }}>

      {/* ── top bar ── */}
      <header style={{
        background: "#fff", borderBottom: "1px solid #e5e7eb",
        padding: "18px 32px", display: "flex", alignItems: "center", gap: 14,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="5" height="5" rx="1" fill="white"/>
            <rect x="9" y="2" width="5" height="5" rx="1" fill="white" opacity=".7"/>
            <rect x="2" y="9" width="5" height="5" rx="1" fill="white" opacity=".7"/>
            <rect x="9" y="9" width="5" height="5" rx="1" fill="white" opacity=".4"/>
          </svg>
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#111" }}>DatasetFilter</h1>
          <p  style={{ margin: 0, fontSize: 12, color: "#9ca3af" }}>Package demo · three data-source modes</p>
        </div>
      </header>

      {/* ── tab bar ── */}
      <nav style={{
        background: "#fff", borderBottom: "1px solid #e5e7eb",
        padding: "0 32px", display: "flex", gap: 0,
      }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "14px 20px",
              fontSize: 13, fontWeight: 500,
              border: "none", background: "none", cursor: "pointer",
              borderBottom: activeTab === tab.id ? "2px solid #6366f1" : "2px solid transparent",
              color: activeTab === tab.id ? "#6366f1" : "#6b7280",
              transition: "color .15s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* ── description banner ── */}
      <div style={{
        background: "#eff6ff", borderBottom: "1px solid #dbeafe",
        padding: "10px 32px", fontSize: 13, color: "#1d4ed8",
      }}>
        {TABS.find(t => t.id === activeTab)?.desc}
      </div>

      {/* ── example A: static data ── */}
      {activeTab === "static" && (
        <>
          {/* code snippet */}
          <CodeSnippet code={`<DatasetFilter
  schema={JOB_SCHEMA}
  data={SAMPLE_JOBS}          {/* ← plain JS array, no fetching */}
  renderContent={renderJobContent}
  enableUrlSync={true}        {/* ← syncs active filters to ?f= URL param */}
/>`} />

          <DatasetFilter
            schema={JOB_SCHEMA}
            data={SAMPLE_JOBS}
            renderContent={renderJobContent}
            enableUrlSync={false}   // keep all three examples independent
          />
        </>
      )}

      {/* ── example B: URL dataset ── */}
      {activeTab === "url" && (
        <>
          <CodeSnippet code={`<DatasetFilter
  schema={JOB_SCHEMA}
  dataset="${REMOTE_URL}"  {/* ← DatasetFilter fetches & caches this */}
  dataTransform={transformUsers}
  renderContent={renderJobContent}
/>`} />

          <DatasetFilter
            schema={JOB_SCHEMA}
            dataset={REMOTE_URL}
            dataTransform={transformUsers}
            renderContent={renderJobContent}
            enableUrlSync={false}
          />
        </>
      )}

      {/* ── example C: custom queryFn ── */}
      {activeTab === "queryfn" && (
        <>
          <CodeSnippet code={`const myQueryFn = async () => {
  const res = await fetch("${REMOTE_URL}");
  const users = await res.json();
  return transformUsers(users);   // return already-transformed data
};

<DatasetFilter
  schema={JOB_SCHEMA}
  queryFn={myQueryFn}
  queryKey={["my-users"]}         {/* ← react-query cache key */}
  renderContent={renderJobContent}
/>`} />

          <DatasetFilter
            schema={JOB_SCHEMA}
            queryFn={async () => {
              const res = await fetch(REMOTE_URL);
              const users = await res.json();
              return transformUsers(users);
            }}
            queryKey={["demo-users-c"]}
            renderContent={renderJobContent}
            enableUrlSync={false}
          />
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// HELPER: tiny code snippet block
// ─────────────────────────────────────────────
function CodeSnippet({ code }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div style={{
      background: "#1e1e2e", margin: "0",
      padding: "18px 28px", position: "relative",
      borderBottom: "1px solid #2d2d44",
    }}>
      <button
        onClick={copy}
        style={{
          position: "absolute", top: 12, right: 16,
          fontSize: 11, padding: "3px 10px",
          background: copied ? "#22c55e" : "#3f3f5a",
          color: "#fff", border: "none", borderRadius: 4, cursor: "pointer",
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre style={{
        margin: 0, fontSize: 12.5, lineHeight: 1.7,
        color: "#cdd6f4", whiteSpace: "pre-wrap", wordBreak: "break-word",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      }}>{code}</pre>
    </div>
  );
}