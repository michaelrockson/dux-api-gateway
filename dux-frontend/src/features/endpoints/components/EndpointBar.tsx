import { ChevronDownIcon, SearchIcon } from "@/components/icons";
import type { EndpointBarProps } from "../interfaces/endpoint.props";
import { GroupIcon } from "./GroupIcon";

export function EndpointBar({
  endpoint,
  menuOpen,
  onToggleMenu,
  canRun,
  running,
  onRun,
}: EndpointBarProps) {
  return (
    <div className="flex items-stretch gap-2 rounded-[14px] border border-border bg-card p-2 shadow-md">
      <button
        type="button"
        onClick={onToggleMenu}
        aria-expanded={menuOpen}
        aria-haspopup="dialog"
        aria-controls="endpoint-menu"
        className={`flex min-h-[60px] min-w-0 flex-1 items-center gap-3.5 rounded-[10px] py-1.5 pl-2 pr-3.5 text-left text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${menuOpen ? "bg-muted" : ""}`}
      >
        <span className="flex size-[46px] flex-none items-center justify-center rounded-[10px] bg-primary text-primary-foreground">
          <GroupIcon group={endpoint.group} size={22} />
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-[13px] text-muted-foreground">
            {endpoint.group}
          </span>
          <span className="truncate font-display text-[19px] font-semibold">
            {endpoint.name}
          </span>
        </span>
        <span className="inline-flex flex-none items-center gap-1.5 text-sm font-semibold text-primary">
          Change
          <ChevronDownIcon
            size={16}
            className={`transition-transform motion-reduce:transition-none ${menuOpen ? "rotate-180" : ""}`}
          />
        </span>
      </button>
      <button
        type="button"
        onClick={onRun}
        disabled={!canRun || running}
        className="inline-flex min-h-[60px] flex-none items-center gap-2 rounded-[10px] bg-primary px-7 text-[17px] font-semibold text-primary-foreground hover:brightness-110 disabled:bg-secondary disabled:text-muted-foreground disabled:hover:brightness-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <SearchIcon size={18} />
        {running ? "Looking…" : "Go"}
      </button>
    </div>
  );
}
