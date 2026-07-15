// Single source of truth for all site content. Edit here to update the site.

export const site = {
  name: "Parveen Kumar",
  role: "SOFTWARE ENGINEER",
  creatingSince: 2023, // ponytail: guessed year — change to your real start year
  email: "parveen.iiitdwd@gmail.com",

  // Hero + about copy
  heroIntro:
    "I build modern, scalable, backend-heavy web systems — from real-time data pipelines to resilient API gateways.",
  about:
    "I'm a backend engineer drawn to the parts of a system that stay invisible when they're working — rate limiters, circuit breakers and failover logic, idempotency keys, atomic transactions. That's the concurrency and fault-tolerance layer: the stuff that has to hold when a dependency drops, a request gets retried, or load spikes. Below is a slice of what I've been building.",
  // Web3Forms access key — set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local (see .env.local.example)
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",

  socials: [
    { label: "GitHub", href: "https://github.com/praveen-dhankhar" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/praveen-dhankhar/" },
    { label: "LeetCode", href: "https://leetcode.com/u/parveen_013/" },
    { label: "CodeChef", href: "https://www.codechef.com/users/parrveen" },
  ],

  // "What I do" — adapted from your GitHub work
  focus: [
    { title: "Backend Systems", tags: ["REST APIs", "Rate Limiting", "Queues"] },
    { title: "Distributed Systems", tags: ["Reverse Proxies", "Failover", "Observability"] },
    { title: "Data Pipelines", tags: ["Ingestion", "Aggregation", "PostgreSQL"] },
    { title: "LLM Infrastructure", tags: ["Streaming", "SSE", "Gateways"] },
  ],

  // Featured projects (pulled from your public repos)
  projects: [
    {
      title: "PulseStream",
      blurb:
        "Production-style real-time analytics pipeline — rate-limited ingestion, worker-pool aggregation, PostgreSQL rollups, REST API, Grafana.",
      stack: ["Go", "PostgreSQL", "Grafana"],
      repo: "https://github.com/praveen-dhankhar/PulseStream",
      live: null,
    },
    {
      title: "StreamGuard",
      blurb:
        "Resilient reverse proxy for streaming LLM APIs — failover, budget enforcement, and explicit SSE recovery events.",
      stack: ["Go", "SSE", "Reverse Proxy"],
      repo: "https://github.com/praveen-dhankhar/StreamGuard",
      live: null,
    },
    {
      title: "Aegis",
      blurb: "Distributed rate limiting platform built for high-throughput services.",
      stack: ["Java", "Distributed Systems"],
      repo: "https://github.com/praveen-dhankhar/Aegis",
      live: null,
    },
    {
      title: "AutoDev.Py",
      blurb: "An automated software engineer — an autonomous agent that plans and writes code.",
      stack: ["Python", "LLM", "Agents"],
      repo: "https://github.com/praveen-dhankhar/AutoDev.Py",
      live: null,
    },
    {
      title: "SyncHub",
      blurb: "Real-time sync platform with a clean web dashboard.",
      stack: ["TypeScript", "Next.js"],
      repo: "https://github.com/praveen-dhankhar/SyncHub",
      live: "https://sync-hub-olive.vercel.app",
    },
    {
      title: "ExchangeOS",
      blurb: "A trading/exchange platform with real-time order flow and a responsive web interface.",
      stack: ["TypeScript", "Next.js"],
      repo: "https://github.com/praveen-dhankhar/ExchangeOS",
      live: null,
    },
  ],

  footerTagline: ["Building systems", "that scale."],

  allWorkHref: "https://github.com/praveen-dhankhar",
} as const;

// URL-safe slug for /work/[slug] detail pages.
export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// Gradient "thumbnails" stand in for real project imagery (cards + detail hero).
export const projectGradients = [
  "linear-gradient(135deg,#f97316,#ec4899)",
  "linear-gradient(135deg,#6366f1,#0ea5e9)",
  "linear-gradient(135deg,#ec4899,#8b5cf6)",
  "linear-gradient(135deg,#10b981,#0ea5e9)",
  "linear-gradient(135deg,#f59e0b,#ef4444)",
  "linear-gradient(135deg,#8b5cf6,#3b82f6)",
];
