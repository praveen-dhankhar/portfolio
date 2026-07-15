"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";

type Status = "idle" | "sending" | "ok" | "error";

// Inline brand marks (simple-icons paths). CodeChef falls back to a monogram.
const ICONS: Record<string, string> = {
  GitHub:
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  LinkedIn:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  LeetCode:
    "M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z",
};

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!site.web3formsKey) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: site.web3formsKey, ...data }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-xl border border-cream/15 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-cream/60 focus:outline-none";

  return (
    <section id="contact" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Left */}
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h2 className="display mt-5 text-[clamp(2.5rem,10vw,7rem)]">Let&apos;s talk.</h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
              Have a project or need help? Fill out the form, and I&apos;ll get back to you soon.
            </p>

            <a
              href={`mailto:${site.email}`}
              className="mt-8 inline-block text-lg underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              {site.email}
            </a>

            <ul className="mt-8 flex gap-3">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink/5 text-ink transition-colors hover:bg-ink hover:text-cream"
                  >
                    {ICONS[s.label] ? (
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                        <path d={ICONS[s.label]} />
                      </svg>
                    ) : (
                      <span className="text-xs font-semibold">{s.label.slice(0, 2)}</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Right — dark form card */}
          <Reveal delay={90}>
            <form onSubmit={onSubmit} className="space-y-5 rounded-3xl bg-ink p-6 text-cream md:p-8">
              <div>
                <label htmlFor="name" className="text-sm">Name</label>
                <input id="name" type="text" name="name" required placeholder="Enter your name" className={`mt-2 ${field}`} />
              </div>
              <div>
                <label htmlFor="email" className="text-sm">Email</label>
                <input id="email" type="email" name="email" required placeholder="Enter your email" className={`mt-2 ${field}`} />
              </div>
              <div>
                <label htmlFor="message" className="text-sm">Your Project</label>
                <textarea id="message" name="message" required rows={5} placeholder="Tell me about your project" className={`mt-2 resize-none ${field}`} />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-xl bg-cream py-3.5 text-sm font-medium text-ink transition-opacity hover:opacity-85 disabled:opacity-50"
              >
                {status === "sending" ? "Sending…" : "Submit"}
              </button>

              {status === "ok" && <p className="text-sm text-cream/80">Thanks — I&apos;ll get back to you soon.</p>}
              {status === "error" && (
                <p className="text-sm text-cream/80">
                  {site.web3formsKey
                    ? "Something went wrong. Email me directly instead."
                    : "Form not configured yet — set NEXT_PUBLIC_WEB3FORMS_KEY. For now, email me directly."}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
