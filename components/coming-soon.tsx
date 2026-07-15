import { Reveal } from "@/components/reveal";

export function ComingSoon({
  id,
  eyebrow,
  title,
  note,
}: {
  id: string;
  eyebrow: string;
  title: string;
  note: string;
}) {
  return (
    <section id={id} className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
          <div className="mt-10 flex items-center gap-4 rounded-2xl border border-dashed border-line px-7 py-10">
            <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-ink" />
            <p className="text-muted">{note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
