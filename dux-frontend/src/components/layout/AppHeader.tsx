import type { ReactNode } from "react";

interface AppHeaderProps {
  children?: ReactNode;
}

export function AppHeader({ children }: AppHeaderProps) {
  return (
    <header className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5">
      <a
        href="/"
        aria-label="Dux Gateway home"
        className="font-display text-2xl font-bold tracking-tight text-foreground no-underline"
      >
        dux<span className="text-primary">.</span>
      </a>
      {children && <div className="flex gap-2">{children}</div>}
    </header>
  );
}
