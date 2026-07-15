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
      stack: ["Go", "PostgreSQL", "Grafana", "pgx", "Docker"],
      repo: "https://github.com/praveen-dhankhar/PulseStream",
      live: null,
      overview:
        "PulseStream is a real-time analytics pipeline in Go that ingests the public GitHub Events API, aggregates activity metrics in near-real-time, persists them to PostgreSQL, and serves them through a REST API and a Grafana dashboard. It's built to demonstrate the unglamorous 80% of a data platform — the layer before “load a CSV into pandas”: getting real, continuously-arriving external data into a queryable, aggregated form, reliably. Around 1,600 lines of Go with a single runtime dependency (pgx).",
      sections: [
        {
          heading: "Ingestion under a live rate limit",
          body: "The ingest layer polls /events with conditional requests (If-None-Match, so a 304 costs nothing against the rate limit), honors X-Poll-Interval and X-RateLimit headers, and deduplicates overlapping pages with an in-memory ring set. It stays deliberately dumb — acquisition only, no business logic.",
        },
        {
          heading: "Backpressure & worker pool",
          body: "A buffered Go channel sits between poller and processor; a full channel blocks the poller, which is the backpressure mechanism. A worker pool (default NumCPU) normalizes each event and, in a single transaction, inserts the raw row and increments two rollup tables — aggregation happens at write time, so the dashboard is near-real-time with no scheduler.",
        },
        {
          heading: "Idempotent storage & crash recovery",
          body: "Storage is an append-only events table plus incrementally-maintained rollups, so dashboard queries never scan raw events. Writes are idempotent with a measured mid-batch crash-recovery guarantee — the pipeline restarts without double-counting.",
        },
        {
          heading: "Serving layer",
          body: "A read-only REST API over Postgres built on the Go 1.22 stdlib http.ServeMux (no router dependency), plus a provisioned four-panel Grafana dashboard for live visualization.",
        },
      ],
    },
    {
      title: "StreamGuard",
      blurb:
        "Resilient Go reverse proxy for streaming LLM APIs — deterministic failover, budget enforcement, and explicit SSE recovery events.",
      stack: ["Go", "SSE", "Reverse Proxy", "OpenAI", "Anthropic"],
      repo: "https://github.com/praveen-dhankhar/StreamGuard",
      live: null,
      overview:
        "StreamGuard is a Go reverse proxy for streaming LLM workloads with one promise: users never see a broken stream, and you never pay for a failed generation. It detects mid-stream upstream failures, fails over deterministically across configured providers (e.g. OpenAI → Anthropic), and exposes every recovery decision through an explicit SSE wire protocol clients can render safely.",
      sections: [
        {
          heading: "Mid-stream failover",
          body: "Detects dead_socket, silent_hang, and malformed upstream failures mid-stream, replays the full original request against the next provider, and preserves stream continuity — emitting gateway_failover and gateway_regenerating events so clients can render failover and truncation states without corruption.",
        },
        {
          heading: "Billing integrity",
          body: "Separates tokens_delivered from tokens_billed so failed attempts stay visible without being billed, backed by a reconciliation job that applies drift and a calibration layer that collects samples and percentiles from a local tokenizer registry.",
        },
        {
          heading: "Admission control",
          body: "Enforces per-key budgets with atomic token reservation, allowlists, and admission-time rate limiting on the live path, with per-provider circuit breakers guarding each upstream.",
        },
        {
          heading: "Deterministic testing",
          body: "A mock-upstream harness produces deterministic SSE, with split-frame validation and build-tag-gated chaos execution — plus CI and a Go Report Card gate.",
        },
      ],
    },
    {
      title: "Aegis",
      blurb:
        "Distributed rate-limiting platform — Java 21 + Spring Boot + Redis with atomic Lua algorithms and a React control plane.",
      stack: ["Java 21", "Spring Boot", "Redis", "Lua", "React"],
      repo: "https://github.com/praveen-dhankhar/Aegis",
      live: null,
      overview:
        "Aegis is a distributed rate-limiting platform — Java 21 and Spring Boot 3 backed by Redis 7 — implementing Token Bucket, Sliding Window Log, and Fixed Window Counter with atomic Lua scripts, so concurrent requests across multiple service instances share a single limiter state. It ships with a protected admin API, Prometheus/Grafana observability, and a React control-plane dashboard.",
      sections: [
        {
          heading: "Atomic algorithms",
          body: "Three algorithms — Token Bucket, Sliding Window Log, Fixed Window Counter — each a single Lua execution per decision, with no GET-then-SET races. A RateLimitFilter resolves the caller by X-API-Key, JWT subject, IP, or global scope; per-client config is cached through Caffeine plus Redis.",
        },
        {
          heading: "Control plane",
          body: "A monochromatic React 18 + TypeScript dashboard (Vite, TanStack Query, Zod, Recharts, Playwright) shows live allowed/rejected traffic, rejection ratio, Redis latency and errors, with runtime rule management and a sandbox that exercises real limiter behavior.",
        },
        {
          heading: "Operations",
          body: "A Docker Compose stack runs app + Redis + Prometheus + Grafana, with Actuator/Prometheus metrics, Swagger UI, and Testcontainers-backed integration tests. Redis stays on the internal network, never published to the host.",
        },
      ],
    },
    {
      title: "AutoDev.Py",
      blurb:
        "Local, self-correcting Python coding agent — plans, writes, and runs code in a Docker sandbox, retrying on the real traceback.",
      stack: ["Python", "CrewAI", "Ollama", "Docker", "Streamlit"],
      repo: "https://github.com/praveen-dhankhar/AutoDev.Py",
      live: null,
      overview:
        "AutoDev.py is a local, self-correcting Python coding agent. It takes a natural-language task, plans the implementation, writes a script, executes it in a constrained Docker sandbox, and retries with the exact traceback when the code fails. It's local-first — Ollama for inference, Streamlit for the UI, Docker for isolation — and the real engineering goal isn't code generation, it's an observable feedback loop around untrusted generated code.",
      sections: [
        {
          heading: "Agent flow",
          body: "An Architect → Coder → QA pipeline driven by an explicit orchestrator state machine (IDLE → PLANNING → CODING → EXECUTING → SUCCEEDED / RETRYING / FAILED). Agents return their output to the orchestrator rather than calling each other, keeping retries, cancellation, and persistence inspectable through JSONL transition logs.",
        },
        {
          heading: "Sandboxed execution",
          body: "A Docker-backed SandboxedPythonExecutor with no host fallback runs every generated script; fail-closed sandbox checks, bounded retries, and a repeated-traceback circuit breaker stop runaway loops.",
        },
        {
          heading: "Reproducible sessions",
          body: "Each run writes task.txt, plan.md, numbered attempt files, a final.py (only after a passing execution), and a timestamped execution_log.jsonl under the session directory.",
        },
        {
          heading: "Tooling",
          body: "A Streamlit dashboard and a pr-agent CLI drive runs; CI covers Ruff, unit tests, package build, Docker builds, and adversarial sandbox tests.",
        },
      ],
    },
    {
      title: "SyncHub",
      blurb:
        "Full-stack video-conferencing platform built from scratch on native WebRTC + mediasoup — no third-party media SDKs.",
      stack: ["Next.js", "WebRTC", "mediasoup", "Node.js", "PostgreSQL"],
      repo: "https://github.com/praveen-dhankhar/SyncHub",
      live: "https://sync-hub-olive.vercel.app",
      overview:
        "SyncHub is a full-stack, real-time video-conferencing platform built from scratch on native WebRTC and mediasoup — no third-party media SDKs. One-to-one calls run peer-to-peer; group calls scale through a mediasoup Selective Forwarding Unit. Owning the media pipeline end to end unlocks capabilities off-the-shelf SDKs can't: end-to-end-encrypted messaging, fully local recording, in-browser virtual backgrounds, and AI meeting intelligence.",
      sections: [
        {
          heading: "Media pipeline",
          body: "1:1 calls relay SDP and ICE through a custom WebSocket server with media flowing directly between peers (STUN/TURN fallback for NAT traversal); group calls of 10+ produce to a mediasoup SFU that forwards RTP without transcoding. Adaptive quality, screen sharing, and ICE candidate-pool optimization.",
        },
        {
          heading: "Local recording & P2P transfer",
          body: "All participant streams are composited onto one canvas grid, audio mixed via AudioContext, and captured with MediaRecorder as a single WebM — then sent peer-to-peer over RTCDataChannel in 64 KB chunks with backpressure handling. Zero server involvement: no upload endpoints, no cloud storage, no transcoding.",
        },
        {
          heading: "AI meeting intelligence",
          body: "Google Gemini powers one-click summaries, structured action-item extraction (assignee, due date, confidence), live smart-reply suggestions, and RAG-powered Q&A across full meeting history with citations.",
        },
        {
          heading: "Security & auth",
          body: "ECDH key exchange with AES-256-GCM for end-to-end-encrypted messaging via the Web Crypto API; JWT access/refresh rotation in httpOnly cookies; Google and Discord OAuth plus email/password with bcrypt and SMTP OTP; multi-tier rate limiting and Helmet headers.",
        },
      ],
    },
    {
      title: "ExchangeOS",
      blurb:
        "Low-latency order-matching engine — price-time-priority matching, fixed-point math, Redis Pub/Sub, TimescaleDB.",
      stack: ["TypeScript", "Node.js", "Redis", "TimescaleDB", "WebSocket"],
      repo: "https://github.com/praveen-dhankhar/ExchangeOS",
      live: null,
      overview:
        "ExchangeOS is a low-latency order-matching engine built on a microservices design — API gateway, matching engine, WebSocket server, and DB processor — for scalable, isolated trade execution. It implements a deterministic price-time-priority matching algorithm with O(log n) order insertion and precise fixed-point arithmetic, propagating the orderbook in real time over Redis Pub/Sub and WebSockets.",
      sections: [
        {
          heading: "Matching engine",
          body: "Deterministic price-time priority with O(log n) order insertion and fixed-point math via decimal.js; atomic balance locking and settlement, configurable self-trade-prevention modes, and periodic (3s) snapshot persistence.",
        },
        {
          heading: "Async architecture",
          body: "The API gateway and engine communicate through Redis queues in a request-response-over-queue pattern — the API subscribes to a unique response channel, pushes the order, and the engine replies via Pub/Sub, so the API confirms fast without waiting on the database write.",
        },
        {
          heading: "Storage & market data",
          body: "A DB processor consumes engine output and writes to TimescaleDB hypertables (orders, trades, prices), with candlestick/kline aggregation driving the time-series charts.",
        },
      ],
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
