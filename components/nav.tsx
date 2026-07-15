import { site } from "@/lib/site";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a href="/#top" className="text-sm font-semibold tracking-tight">
          {site.name}
        </a>
        <a
          href={`mailto:${site.email}`}
          className="text-sm text-muted transition-colors hover:text-ink"
        >
          {site.email}
        </a>
      </nav>
    </header>
  );
}
