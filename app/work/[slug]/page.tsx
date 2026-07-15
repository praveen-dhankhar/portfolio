import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site, projectGradients, slugify } from "@/lib/site";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

function findProject(slug: string) {
  const i = site.projects.findIndex((p) => slugify(p.title) === slug);
  return i === -1 ? null : { project: site.projects[i], index: i };
}

export function generateStaticParams() {
  return site.projects.map((p) => ({ slug: slugify(p.title) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const found = findProject(slug);
  if (!found) return { title: `Work — ${site.name}` };
  return { title: `${found.project.title} — ${site.name}`, description: found.project.blurb };
}

export default async function WorkDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = findProject(slug);
  if (!found) notFound();
  const { project: p, index } = found;

  const others = site.projects.filter((_, i) => i !== index).slice(0, 2);

  return (
    <>
      <Nav />
      <main>
        <article className="mx-auto max-w-4xl px-6 pt-16 pb-20 md:px-10 md:pt-24">
          <Link href="/#projects" className="text-sm text-muted transition-colors hover:text-ink">
            ← Back to work
          </Link>

          <h1 className="display mt-8 text-[clamp(2.5rem,9vw,6rem)]">{p.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{p.blurb}</p>

          {/* Meta row */}
          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-6 sm:grid-cols-4">
            <div>
              <dt className="eyebrow">Category</dt>
              <dd className="mt-2 text-sm">{p.stack[0]}</dd>
            </div>
            <div>
              <dt className="eyebrow">Stack</dt>
              <dd className="mt-2 text-sm">{p.stack.join(", ")}</dd>
            </div>
            <div>
              <dt className="eyebrow">Code</dt>
              <dd className="mt-2 text-sm">
                <a href={p.repo} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:opacity-70">
                  GitHub ↗
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Live</dt>
              <dd className="mt-2 text-sm">
                {p.live ? (
                  <a href={p.live} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:opacity-70">
                    Visit ↗
                  </a>
                ) : (
                  <span className="text-muted">—</span>
                )}
              </dd>
            </div>
          </dl>

          {/* Hero visual */}
          <div
            className="relative mt-10 flex aspect-16/9 w-full items-end overflow-hidden rounded-2xl p-6"
            style={{ background: projectGradients[index % projectGradients.length] }}
          >
            <span className="display text-4xl text-white/95 md:text-6xl">{p.title}</span>
          </div>

          {/* Body */}
          <section className="mt-16">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Overview</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">{p.overview}</p>
          </section>

          {p.sections.map((s) => (
            <section key={s.heading} className="mt-12">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{s.heading}</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">{s.body}</p>
            </section>
          ))}

          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Built with</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li key={s} className="rounded-full border border-line px-4 py-1.5 text-sm text-muted">
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition-opacity hover:opacity-85"
              >
                View code ↗
              </a>
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-ink"
                >
                  Live demo ↗
                </a>
              )}
            </div>
          </section>
        </article>

        {/* More Projects */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">
            <h2 className="display text-[clamp(1.75rem,5vw,3rem)]">More Projects</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.title}
                  href={`/work/${slugify(o.title)}`}
                  className="group overflow-hidden rounded-2xl border border-line transition-colors hover:border-ink"
                >
                  <div
                    className="relative flex aspect-16/10 items-end p-5"
                    style={{ background: projectGradients[site.projects.indexOf(o) % projectGradients.length] }}
                  >
                    <span className="display text-2xl text-white/95">{o.title}</span>
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <span className="text-sm font-medium">{o.title}</span>
                    <span className="text-xs text-muted">{o.stack.slice(0, 2).join(" · ")}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
