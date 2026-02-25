/**
 * Living System Architecture — Dashboard
 * ----------------------------------------
 * Production-grade SaaS dashboard.
 * Drop into a Vite + React + TypeScript project with Tailwind CSS configured.
 *
 * @tech  React 18 · TypeScript · Tailwind CSS
 * @note  No external dependencies beyond React. All data is mocked.
 */

import { useState } from "react";

// ─────────────────────────────────────────────
// 1. TypeScript Interfaces
// ─────────────────────────────────────────────

type HealthStatus = "Healthy" | "Warning" | "Critical";

interface Project {
  id: string;
  name: string;
  repoSource: string;
  repoUrl: string;
  totalComponents: number;
  totalDependencies: number;
  healthScore: number; // 0 – 100
  lastScan: string; // ISO date string
  language: string;
}

interface StatCard {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

// ─────────────────────────────────────────────
// 2. Mock Data
// ─────────────────────────────────────────────

const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-001",
    name: "Nexus API Gateway",
    repoSource: "GitHub",
    repoUrl: "github.com/org/nexus-api",
    totalComponents: 84,
    totalDependencies: 312,
    healthScore: 91,
    lastScan: "2026-02-24T14:30:00Z",
    language: "TypeScript",
  },
  {
    id: "proj-002",
    name: "Atlas Data Pipeline",
    repoSource: "GitHub",
    repoUrl: "github.com/org/atlas-pipeline",
    totalComponents: 57,
    totalDependencies: 198,
    healthScore: 63,
    lastScan: "2026-02-23T09:15:00Z",
    language: "Python",
  },
  {
    id: "proj-003",
    name: "Orion Auth Service",
    repoSource: "GitLab",
    repoUrl: "gitlab.com/org/orion-auth",
    totalComponents: 33,
    totalDependencies: 94,
    healthScore: 38,
    lastScan: "2026-02-20T17:45:00Z",
    language: "Go",
  },
  {
    id: "proj-004",
    name: "Helix Event Bus",
    repoSource: "GitHub",
    repoUrl: "github.com/org/helix-events",
    totalComponents: 46,
    totalDependencies: 156,
    healthScore: 77,
    lastScan: "2026-02-25T08:00:00Z",
    language: "Rust",
  },
  {
    id: "proj-005",
    name: "Polaris ML Engine",
    repoSource: "Bitbucket",
    repoUrl: "bitbucket.org/org/polaris-ml",
    totalComponents: 102,
    totalDependencies: 421,
    healthScore: 55,
    lastScan: "2026-02-22T11:30:00Z",
    language: "Python",
  },
  {
    id: "proj-006",
    name: "Vega Frontend Shell",
    repoSource: "GitHub",
    repoUrl: "github.com/org/vega-shell",
    totalComponents: 29,
    totalDependencies: 88,
    healthScore: 88,
    lastScan: "2026-02-25T10:20:00Z",
    language: "TypeScript",
  },
];

// ─────────────────────────────────────────────
// 3. Helper Utilities
// ─────────────────────────────────────────────

function getHealthStatus(score: number): HealthStatus {
  if (score >= 75) return "Healthy";
  if (score >= 50) return "Warning";
  return "Critical";
}

function getHealthColor(score: number) {
  const status = getHealthStatus(score);
  return {
    Healthy: {
      bar: "bg-emerald-400",
      badge: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
      ring: "text-emerald-400",
    },
    Warning: {
      bar: "bg-amber-400",
      badge: "bg-amber-500/15 text-amber-400 ring-amber-500/30",
      ring: "text-amber-400",
    },
    Critical: {
      bar: "bg-rose-500",
      badge: "bg-rose-500/15 text-rose-400 ring-rose-500/30",
      ring: "text-rose-400",
    },
  }[status];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function deriveStats(projects: Project[]): StatCard[] {
  const total = projects.length;
  const totalComponents = projects.reduce((s, p) => s + p.totalComponents, 0);
  const avgHealth =
    total > 0
      ? Math.round(projects.reduce((s, p) => s + p.healthScore, 0) / total)
      : 0;
  const highRisk = projects.filter((p) => getHealthStatus(p.healthScore) === "Critical").length;

  return [
    {
      label: "Total Projects",
      value: total,
      trend: "+2 this month",
      trendUp: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      ),
    },
    {
      label: "Total Components",
      value: totalComponents.toLocaleString(),
      trend: "+84 since last scan",
      trendUp: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      label: "Avg Health Score",
      value: `${avgHealth}%`,
      trend: "-3% from last week",
      trendUp: false,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
    {
      label: "High-Risk Components",
      value: highRisk,
      trend: "Needs attention",
      trendUp: false,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
  ];
}

// ─────────────────────────────────────────────
// 4. Sub-Components
// ─────────────────────────────────────────────

/** Top navigation bar — sticky */
function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#080e1a]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-900/40">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-5 w-5">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
          </div>
          <span className="hidden text-base font-semibold tracking-tight text-white sm:block">
            Living System<span className="text-blue-400"> Architecture</span>
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Settings icon */}
          <button className="group flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/[0.06] hover:text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
          </button>

          {/* User */}
          <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.04] px-3 py-1.5 transition hover:bg-white/[0.08]">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-xs font-bold text-white">
              AK
            </div>
            <span className="hidden text-sm font-medium text-slate-300 sm:block">Alex Kim</span>
          </div>
        </div>
      </div>
    </header>
  );
}

/** Dashboard header with title, subtitle, and primary CTA */
function DashboardHeader({ onCreateProject }: { onCreateProject: () => void }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-blue-500">
          Overview
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Dashboard
        </h1>
        <p className="mt-2 text-slate-400">
          A real-time overview of your system architectures
        </p>
      </div>
      <button
        onClick={onCreateProject}
        className="group inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-800/50 active:scale-95"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4 transition group-hover:rotate-90">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Create New Project
      </button>
    </div>
  );
}

/** Stat card grid */
function StatsGrid({ stats }: { stats: StatCard[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="group relative overflow-hidden rounded-2xl border border-blue-400/20 bg-gradient-to-br from-[#16213e] to-[#1a2a50] p-5 shadow-2xl shadow-black/40 transition duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-blue-900/50"
        >
          {/* Glow accent */}
          <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-blue-500/15 blur-2xl transition group-hover:bg-blue-400/30" />
          {/* Top shimmer line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
              {stat.icon}
            </div>
            {stat.trend && (
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${
                  stat.trendUp
                    ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20"
                    : "bg-rose-500/10 text-rose-400 ring-rose-500/20"
                }`}
              >
                {stat.trendUp ? "↑" : "↓"} {stat.trend}
              </span>
            )}
          </div>

          <div className="mt-4">
            <p className="text-3xl font-bold tracking-tight text-white">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Circular health score indicator */
function HealthCircle({ score }: { score: number }) {
  const status = getHealthStatus(score);
  const colors = getHealthColor(score);
  const r = 20;
  const circ = 2 * Math.PI * r;
  const dashOffset = circ - (score / 100) * circ;

  return (
    <div className="relative flex items-center justify-center">
      <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
        <circle cx="28" cy="28" r={r} fill="none" stroke="#1e2d4a" strokeWidth="5" />
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          strokeWidth="5"
          strokeDasharray={circ}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          className={`${
            status === "Healthy"
              ? "stroke-emerald-400"
              : status === "Warning"
              ? "stroke-amber-400"
              : "stroke-rose-500"
          } transition-all duration-500`}
        />
      </svg>
      <span className={`absolute text-sm font-bold ${colors.ring}`}>
        {score}
      </span>
    </div>
  );
}

/**
 * ProjectRow — horizontal list-row displayed inside a unified panel.
 * Visually distinct from the stat cards above: flat, wide, table-like rows
 * on a dark teal-navy surface rather than individual floating cards.
 */
function ProjectRow({ project, isLast }: { project: Project; isLast: boolean }) {
  const status = getHealthStatus(project.healthScore);
  const colors = getHealthColor(project.healthScore);

  return (
    <div
      className={`group relative flex flex-col gap-5 px-6 py-7 transition-colors duration-200 hover:bg-cyan-950/25 sm:flex-row sm:items-center sm:gap-0 ${
        !isLast ? "border-b border-slate-700/40" : ""
      }`}
    >
      {/* Hover left accent reveal */}
      <div
        className={`absolute inset-y-0 left-0 w-[3px] opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${
          status === "Healthy" ? "bg-emerald-400" : status === "Warning" ? "bg-amber-400" : "bg-rose-500"
        }`}
      />

      {/* ── Col 1: Status dot + Name + Repo (flex-[2.5]) ── */}
      <div className="min-w-0 sm:flex-[2.5] sm:pr-8">
        <div className="flex items-center gap-3">
          <span
            className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${
              status === "Healthy" ? "bg-emerald-400" : status === "Warning" ? "bg-amber-400" : "bg-rose-500"
            }`}
          />
          <h3 className="truncate text-base font-semibold text-white">{project.name}</h3>
          <span className="hidden shrink-0 rounded-md bg-cyan-500/10 px-2 py-0.5 text-xs font-medium text-cyan-400 ring-1 ring-cyan-500/20 sm:inline-block">
            {project.language}
          </span>
        </div>
        <div className="mt-1.5 flex items-center gap-2 pl-[22px] text-xs text-slate-500">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5 shrink-0">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
          </svg>
          <span className="truncate">{project.repoSource} · {project.repoUrl}</span>
        </div>
      </div>

      {/* ── Col 2: Components + Dependencies (flex-1) ── */}
      <div className="flex gap-8 pl-[22px] sm:flex-[1] sm:flex-col sm:gap-2 sm:pl-0 sm:pr-8">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">Components</p>
          <p className="mt-1 text-base font-bold text-white">{project.totalComponents}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">Dependencies</p>
          <p className="mt-1 text-base font-bold text-white">{project.totalDependencies}</p>
        </div>
      </div>

      {/* ── Col 3: Health bar (flex-[1.4]) ── */}
      <div className="pl-[22px] sm:flex-[1.4] sm:pl-0 sm:pr-8">
        <div className="mb-2.5 flex items-center justify-between">
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${colors.badge}`}>
            {status}
          </span>
          <span className={`text-sm font-bold ${
            status === "Healthy" ? "text-emerald-400" : status === "Warning" ? "text-amber-400" : "text-rose-400"
          }`}>
            {project.healthScore}%
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-700/50">
          <div
            className={`h-full rounded-full transition-all duration-700 ${colors.bar}`}
            style={{ width: `${project.healthScore}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-500">{formatDate(project.lastScan)}</p>
      </div>

      {/* ── Col 4: Action buttons (shrink-0) ── */}
      <div className="flex shrink-0 items-center gap-2.5 pl-[22px] sm:pl-0">
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 active:scale-95 whitespace-nowrap">
          View Architecture
        </button>
        <button className="flex items-center gap-2 rounded-lg border border-slate-600/40 bg-slate-800/60 px-4 py-2 text-sm font-semibold text-slate-400 transition hover:border-cyan-500/40 hover:bg-cyan-950/40 hover:text-cyan-300 active:scale-95 whitespace-nowrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-3.5 w-3.5 shrink-0">
            <path d="M23 4v6h-6M1 20v-6h6" />
            <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
          </svg>
          Re-scan
        </button>
      </div>
    </div>
  );
}

/** Empty state when no projects */
function EmptyState({ onCreateProject }: { onCreateProject: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.1] bg-[#0a111f]/60 py-20 px-8 text-center">
      {/* Placeholder illustration */}
      <div className="relative mb-6 flex h-28 w-28 items-center justify-center rounded-3xl bg-blue-500/10 ring-1 ring-blue-500/20">
        <div className="absolute inset-0 rounded-3xl bg-blue-500/5 blur-lg" />
        <svg viewBox="0 0 64 64" fill="none" className="h-16 w-16 text-blue-400/70" stroke="currentColor" strokeWidth="1.4">
          <rect x="8" y="8" width="20" height="20" rx="4" />
          <rect x="36" y="8" width="20" height="20" rx="4" />
          <rect x="8" y="36" width="20" height="20" rx="4" />
          <rect x="36" y="36" width="20" height="20" rx="4" />
          <line x1="18" y1="28" x2="18" y2="36" />
          <line x1="46" y1="28" x2="46" y2="36" />
          <line x1="28" y1="18" x2="36" y2="18" />
          <line x1="28" y1="46" x2="36" y2="46" />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-white">No projects yet</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-400">
        Start by analyzing your first system. Connect a repository and let the
        architecture engine map your codebase.
      </p>
      <button
        onClick={onCreateProject}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:from-blue-500 hover:to-indigo-500 active:scale-95"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Create New Project
      </button>
    </div>
  );
}

/** Search + filter toolbar */
function ProjectsToolbar({
  search,
  onSearchChange,
  filter,
  onFilterChange,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  filter: HealthStatus | "All";
  onFilterChange: (v: HealthStatus | "All") => void;
}) {
  const filters: (HealthStatus | "All")[] = ["All", "Healthy", "Warning", "Critical"];
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative max-w-xs w-full">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search projects…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 pl-9 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Filter pills */}
      <div className="flex gap-1.5 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              filter === f
                ? "bg-blue-600 text-white shadow-md shadow-blue-900/40"
                : "border border-white/[0.08] bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 5. Main Dashboard Component
// ─────────────────────────────────────────────

/**
 * Dashboard — main entry page after login.
 *
 * Swap MOCK_PROJECTS with an API call (e.g. useEffect → fetch /api/projects)
 * to connect to a real backend.
 */
export default function Dashboard() {
  // In a real app these would come from API calls / React Query
  const [projects] = useState<Project[]>(MOCK_PROJECTS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<HealthStatus | "All">("All");

  // Derived stats from project data
  const stats = deriveStats(projects);

  // Filtered project list
  const filtered = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "All" || getHealthStatus(p.healthScore) === filter;
    return matchesSearch && matchesFilter;
  });

  /** Placeholder: wire to router / modal in real app */
  const handleCreateProject = () => {
    alert("Create New Project — connect your modal or router here.");
  };

  return (
    // Full-page dark background with subtle radial glow
    <div className="min-h-screen bg-[#060d1a] text-white">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-900/20 blur-3xl" />
        <div className="absolute top-0 right-0 h-96 w-96 bg-indigo-900/10 blur-3xl" />
      </div>

      <Navbar />

      <main className="relative mx-auto max-w-screen-2xl px-4 pb-20 pt-10 sm:px-8">
        {/* ── Header ── */}
        <DashboardHeader onCreateProject={handleCreateProject} />

        {/* ── Stats Grid ── */}
        <section className="mt-10">
          <StatsGrid stats={stats} />
        </section>

        {/* ── Section Divider ── */}
        <div className="mt-14 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />
          <span className="rounded-full border border-slate-700/50 bg-slate-800/60 px-3 py-1 text-[10px] uppercase tracking-widest text-slate-500">
            Projects
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />
        </div>

        {/* ── Projects Section ── */}
        <section className="mt-6">
          {/* Section label + toolbar */}
          <div className="mb-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-white">Your Projects</h2>
              <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs font-semibold text-cyan-400 ring-1 ring-cyan-500/20">
                {projects.length}
              </span>
            </div>
            <ProjectsToolbar
              search={search}
              onSearchChange={setSearch}
              filter={filter}
              onFilterChange={setFilter}
            />
          </div>

          {/* Projects panel or empty state */}
          {filtered.length === 0 ? (
            <EmptyState onCreateProject={handleCreateProject} />
          ) : (
            /* Single unified panel — dark teal-navy, clearly distinct from the blue stat cards above */
            <div className="overflow-hidden rounded-2xl border border-slate-700/40 bg-[#080f1e] shadow-2xl shadow-black/60">
              {/* Column header row — desktop only */}
              <div className="hidden border-b border-slate-700/30 bg-slate-800/30 px-6 py-4 sm:flex sm:items-center sm:gap-0">
                <span className="flex-[2.5] pr-8 text-xs font-semibold uppercase tracking-widest text-slate-400">Project</span>
                <span className="flex-[1] pr-8 text-xs font-semibold uppercase tracking-widest text-slate-400">Scale</span>
                <span className="flex-[1.4] pr-8 text-xs font-semibold uppercase tracking-widest text-slate-400">Health</span>
                <span className="shrink-0 text-xs font-semibold uppercase tracking-widest text-slate-400">Actions</span>
              </div>
              {/* Rows */}
              {filtered.map((project, i) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  isLast={i === filtered.length - 1}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}