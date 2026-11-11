import type { AddOptionMenuProps } from "../interfaces/lookup.props";

export function AddOptionMenu({
  endpoint,
  available,
  onAdd,
  onClose,
}: AddOptionMenuProps) {
  return (
    <div
      id="add-option-menu"
      className="flex flex-col rounded-xl border border-border bg-card p-1.5 shadow-xl motion-safe:animate-rise"
    >
      <div className="flex items-center justify-between py-1.5 pl-3 pr-1.5">
        <h3 className="m-0 font-display text-base font-bold">
          More options for {endpoint.name}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="min-h-9 rounded-md px-2.5 text-sm font-semibold text-primary hover:bg-muted"
        >
          Done
        </button>
      </div>
      <div
        role="listbox"
        aria-label="Add an option"
        className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-0.5"
      >
        {available.map((param) => (
          <button
            key={param.id}
            type="button"
            role="option"
            aria-selected={false}
            onClick={() => onAdd(param)}
            className="flex min-h-[52px] items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-foreground hover:bg-muted"
          >
            <span className="flex flex-col gap-0.5">
              <span className="text-[15px] font-semibold">{param.label}</span>
              {param.description && (
                <span className="text-[13px] text-muted-foreground">
                  {param.description}
                </span>
              )}
            </span>
            <code className="flex-none rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
              {param.id}
            </code>
          </button>
        ))}
      </div>
    </div>
  );
}
