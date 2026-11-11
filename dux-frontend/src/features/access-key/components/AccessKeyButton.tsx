import { KeyIcon } from "@/components/icons";
import type { AccessKeyButtonProps } from "../interfaces/access-key.props";

export function AccessKeyButton({ attached, onClick }: AccessKeyButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-border bg-card pl-3 pr-3.5 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <KeyIcon size={18} />
      {attached ? "Key in use" : "Get a key"}
      {attached && (
        <span className="size-2 rounded-full bg-success" aria-hidden="true" />
      )}
    </button>
  );
}
