"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

// ---- easing / range helpers -------------------------------------------------
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a), 0, 1); // p mapped into [a,b] → 0..1
const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Glossy 3D-ish decorative mark.
function Mark({ d, className = "" }: { d: string; className?: string }) {
  const uid = d.length;
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden style={{ filter: "drop-shadow(0 10px 14px rgba(0,0,0,0.28))" }}>
      <defs>
        <linearGradient id={`g-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3a3a40" />
          <stop offset="45%" stopColor="#0a0a0b" />
          <stop offset="100%" stopColor="#232327" />
        </linearGradient>
        <linearGradient id={`c-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path d={d} fill={`url(#g-${uid})`} stroke={`url(#c-${uid})`} strokeWidth="2.5" strokeOpacity="0.7" />
    </svg>
  );
}
const SPARKLE = "M50 2c3.5 25 20 41.5 46 45-26 3.5-42.5 20-46 45-3.5-25-20-41.5-46-45 26-3.5 42.5-20 46-45Z";
const BOLT = "M58 2 14 56h26l-8 42 46-56H50L58 2Z";

// Pinned hero→Hey scene: one card rotates rotateY 0→180 while it grows and
// morphs square→portrait; the photo swaps at the 90° edge (back face), and the
// hero labels cross-fade into the Hey copy.
export function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = clamp(-rect.top, 0, total);
      setP(total > 0 ? scrolled / total : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Reduced-motion / no-JS fallback: static stacked hero fold + Hey, no pin.
  if (reduced) return <IntroStatic />;

  const headOut = smooth(range(p, 0.04, 0.26));
  const labelOut = smooth(range(p, 0, 0.2));
  const flip = smooth(range(p, 0.1, 0.62));
  const deg = flip * 180;
  const grow = smooth(range(p, 0.1, 0.72));
  const w = lerp(150, 320, grow);
  const h = lerp(150, 400, grow);
  const ty = lerp(110, 0, smooth(range(p, 0, 0.42)));
  const heyIn = smooth(range(p, 0.52, 0.82));

  return (
    <section ref={sectionRef} id="top" className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="relative mx-auto h-full w-full max-w-6xl px-6 md:px-10">
          {/* Hero headline */}
          <div
            className="pointer-events-none absolute inset-x-6 top-[12%] text-center md:inset-x-10"
            style={{ opacity: 1 - headOut, transform: `translateY(${-90 * headOut}px)` }}
          >
            <Mark d={SPARKLE} className="absolute -left-1 -top-4 h-9 w-9 md:left-2 md:h-14 md:w-14" />
            <Mark d={BOLT} className="absolute -right-1 top-24 h-10 w-10 md:right-2 md:top-40 md:h-16 md:w-16" />
            <h1 className="display text-[clamp(3rem,13vw,11rem)]">Software</h1>
            <h1 className="display text-[clamp(3rem,13vw,11rem)]">Engineer</h1>
          </div>

          {/* Hey! */}
          <h2
            className="display absolute left-6 top-[24%] text-[clamp(2.5rem,7vw,5rem)] md:left-10"
            style={{ opacity: heyIn, transform: `translateX(${lerp(-40, 0, heyIn)}px)` }}
          >
            Hey!
          </h2>

          {/* Left blurb (Hey) */}
          <p
            className="absolute bottom-[16%] left-6 max-w-[16rem] text-base font-medium leading-relaxed md:left-10 md:text-lg"
            style={{ opacity: heyIn, transform: `translateX(${lerp(-30, 0, heyIn)}px)` }}
          >
            I&apos;m {site.name}, a software engineer focused on backend and distributed systems.
          </p>

          {/* Right copy (Hey) */}
          <div
            className="absolute bottom-[16%] right-6 max-w-[18rem] md:right-10"
            style={{ opacity: heyIn, transform: `translateX(${lerp(30, 0, heyIn)}px)` }}
          >
            <p className="text-base leading-relaxed text-muted md:text-lg">{site.about}</p>
            <a href="#contact" className="group mt-6 inline-flex items-center gap-3 text-sm font-medium">
              Get Started
              <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-md border border-line transition-colors group-hover:border-ink">
                ↗
              </span>
            </a>
          </div>

          {/* Corner labels (hero) */}
          <span className="display absolute bottom-[8%] left-6 text-4xl md:left-10 md:text-5xl" style={{ opacity: 1 - labelOut }}>
            ©2026
          </span>
          <span className="eyebrow absolute bottom-[9%] right-6 md:right-10" style={{ opacity: 1 - labelOut }}>
            /Creating since {site.creatingSince}
          </span>

          {/* The card */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1200px" }}>
            <div
              className="relative"
              style={{ width: w, height: h, transform: `translateY(${ty}px) rotateY(${deg}deg)`, transformStyle: "preserve-3d", willChange: "transform" }}
            >
              <Face src="/Headshot(1).jpg" alt={site.name} />
              <Face src="/headshot.png" alt={site.name} back priority={false} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Face({ src, alt, back = false, priority = true }: { src: string; alt: string; back?: boolean; priority?: boolean }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-2xl bg-ink/5"
      style={{ backfaceVisibility: "hidden", transform: back ? "rotateY(180deg)" : undefined }}
    >
      <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 768px) 60vw, 340px" className="object-cover" />
    </div>
  );
}

// Non-animated fallback.
function IntroStatic() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:px-10">
      <h1 className="display text-center text-[clamp(3rem,13vw,11rem)]">Software</h1>
      <h1 className="display text-center text-[clamp(3rem,13vw,11rem)]">Engineer</h1>
      <div className="mx-auto mt-12 max-w-sm">
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-ink/5">
          <Image src="/headshot.png" alt={site.name} fill priority sizes="(max-width: 768px) 90vw, 384px" className="object-cover" />
        </div>
      </div>
      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <p className="text-lg font-medium leading-relaxed">
          I&apos;m {site.name}, a software engineer focused on backend and distributed systems.
        </p>
        <div>
          <p className="text-lg leading-relaxed text-muted">{site.about}</p>
          <a href="#contact" className="group mt-6 inline-flex items-center gap-3 text-sm font-medium">
            Get Started
            <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-md border border-line transition-colors group-hover:border-ink">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
