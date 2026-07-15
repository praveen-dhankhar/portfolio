import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";

export function Focus() {
  return (
    <section id="about" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <p className="eyebrow">What I do</p>
          <h2 className="display mt-4 text-[clamp(2rem,6vw,4rem)]">Services</h2>
        </Reveal>

        <div className="mt-12 border-t border-line">
          {site.focus.map((f, i) => (
            <Reveal key={f.title} delay={i * 70}>
              <div className="group flex flex-col gap-3 border-b border-line py-7 transition-colors hover:bg-ink/2 md:flex-row md:items-center md:justify-between md:gap-8 md:px-2">
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{f.title}</h3>
                <ul className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-muted md:justify-end">
                  {f.tags.map((t, j) => (
                    <li key={t} className="flex items-center gap-2">
                      {j > 0 && <span aria-hidden className="opacity-40">·</span>}
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
