import { CloseIcon } from "@/components/icons";
import type { ParamFieldProps } from "../interfaces/lookup.props";

export function ParamField({
  inputId,
  param,
  value,
  onChange,
  onRemove,
}: ParamFieldProps) {
  const empty = !!param.required && !value.trim();

  const removeButton = !param.required && (
    <button
      type="button"
      onClick={() => onRemove(param.id)}
      aria-label={`Remove ${param.label}`}
      className="inline-flex min-h-7 items-center gap-1 rounded-md px-1.5 text-[12.5px] text-muted-foreground hover:bg-muted hover:text-foreground"
    >
      <CloseIcon size={12} strokeWidth={2.6} />
      Remove
    </button>
  );

  if (param.choices) {
    return (
      <div className="flex flex-none flex-col gap-1.5">
        <div className="flex min-h-7 items-center justify-between gap-2">
          <span id={`${inputId}-label`} className="text-sm font-medium">
            {param.label}
          </span>
          {removeButton}
        </div>
        <div
          role="radiogroup"
          aria-labelledby={`${inputId}-label`}
          className="inline-flex min-h-12 gap-0.5 rounded-[10px] bg-muted p-1"
        >
          {param.choices.map((choice) => {
            const on = value === choice.value;
            return (
              <button
                key={choice.value}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => onChange(param.id, choice.value)}
                className={`min-w-12 rounded-[7px] px-3 text-sm font-semibold ${on ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                {choice.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-[1_1_180px] flex-col gap-1.5">
      <div className="flex min-h-7 items-center justify-between gap-2">
        <label htmlFor={inputId} className="text-sm font-medium">
          {param.label}
          {!param.required && (
            <span className="font-normal text-muted-foreground">
              {" "}
              · optional
            </span>
          )}
        </label>
        {removeButton}
      </div>
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={(e) => onChange(param.id, e.target.value)}
        placeholder={param.placeholder}
        autoComplete="off"
        aria-invalid={empty || undefined}
        className={`min-h-12 w-full rounded-[10px] border bg-card px-3.5 text-base text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30 ${empty ? "border-warning-border" : "border-border"}`}
      />
    </div>
  );
}
