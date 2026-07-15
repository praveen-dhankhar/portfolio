import { site } from "@/lib/site";

export function Footer() {
  const links = [
    { label: "Home", href: "/#top" },
    { label: "Services", href: "/#about" },
    { label: "Work", href: "/#projects" },
    { label: "Contact", href: "/#contact" },
  ];

  const watermark = site.name.split(" ")[0]; // single-word backdrop like the reference

  return (
    <footer className="relative mt-auto overflow-hidden bg-ink text-cream">
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <h2 className="display text-[clamp(2.25rem,6vw,4.5rem)]">
            {site.footerTagline[0]}
            <br />
            {site.footerTagline[1]}
          </h2>

          <nav>
            <p className="text-xl font-medium">/Quick links</p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="inline-block rounded-lg bg-cream px-4 py-2 text-sm font-medium text-ink transition-opacity hover:opacity-80"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xl font-medium">/Contact</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 block text-cream/70 transition-colors hover:text-cream"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-cream/10 py-6 text-xs text-cream/50">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>All rights reserved</span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 select-none" aria-hidden>
        <p className="display text-center text-[26vw] leading-[0.7] text-cream/6">{watermark}</p>
      </div>
    </footer>
  );
}
