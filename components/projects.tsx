import Link from "next/link";
import { site, projectGradients, slugify } from "@/lib/site";
import { Reveal } from "@/components/reveal";

export function Projects() {
  return (
    <section id="projects" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <Reveal className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="display mt-4 text-[clamp(2rem,6vw,4rem)]">
              Featured
              <br />
              Projects
            </h2>
          </div>
          <a
            href={site.allWorkHref}
            target="_blank"
            rel="noreferrer"
            className="hidden text-sm text-muted transition-colors hover:text-ink md:block"
          >
            View all work ↗
          </a>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {site.projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 90} className="h-full">
              <Link
                href={`/work/${slugify(p.title)}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-cream transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_16px_50px_-20px_rgba(0,0,0,0.25)]"
              >
                <div
                  className="relative aspect-16/10 w-full overflow-hidden"
                  style={{ background: projectGradients[i % projectGradients.length] }}
                >
                  <span className="absolute left-5 top-4 font-mono text-xs text-white/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display absolute bottom-3 left-5 text-3xl text-white/95">{p.title}</span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                    <span className="text-xs text-muted">{p.stack.slice(0, 2).join(" · ")}</span>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.blurb}</p>
                  <span className="mt-6 text-sm text-muted transition-colors group-hover:text-ink">
                    Read more ↗
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <a
          href={site.allWorkHref}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-block text-sm text-muted transition-colors hover:text-ink md:hidden"
        >
          View all work ↗
        </a>
      </div>
    </section>
  );
}
