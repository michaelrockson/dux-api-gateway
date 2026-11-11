import { PlusIcon } from "@/components/icons";
import type { ParamsPanelProps } from "../interfaces/lookup.props";
import { ParamField } from "./ParamField";

export function ParamsPanel({
  endpoint,
  active,
  values,
  onChange,
  onRemove,
  canAdd,
  addOpen,
  onToggleAdd,
  missing,
}: ParamsPanelProps) {
  if (endpoint.params.length === 0) {
    return (
      <p className="m-0 pl-1 text-sm text-muted-foreground">
        Nothing to fill in for this one. Just press Go.
      </p>
    );
  }

  return (
    <section
      aria-labelledby="details-title"
      className="flex flex-col gap-3.5 rounded-[14px] border border-border bg-card px-5 pb-5 pt-[18px] motion-safe:animate-rise"
    >
      <h2 id="details-title" className="m-0 font-display text-[17px] font-bold">
        Fill in the details
      </h2>

      <div className="flex flex-wrap items-end gap-x-4 gap-y-3.5">
        {active.map((param) => (
          <ParamField
            key={param.id}
            inputId={`param-${endpoint.id}-${param.id}`}
            param={param}
            value={values[param.id] ?? ""}
            onChange={onChange}
            onRemove={onRemove}
          />
        ))}

        {canAdd && (
          <button
            type="button"
            onClick={onToggleAdd}
            aria-expanded={addOpen}
            aria-controls="add-option-menu"
            className="inline-flex min-h-12 flex-none items-center gap-1.5 rounded-[10px] border border-dashed border-border-strong px-4 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <PlusIcon size={16} />
            Add option
          </button>
        )}
      </div>

      {missing.length > 0 && (
        <p aria-live="polite" className="m-0 text-sm text-muted-foreground">
          Still needed: {missing.join(", ")}.
        </p>
      )}
    </section>
  );
}
