import { SearchIcon } from "@/components/icons";
import type { ResultMessageProps } from "../interfaces/lookup.props";

export function ResultMessage({
  title,
  text,
  tone = "neutral",
}: ResultMessageProps) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
      <span
        className={`flex size-[52px] items-center justify-center rounded-[14px] ${tone === "error" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}
      >
        <SearchIcon size={24} strokeWidth={1.8} />
      </span>
      <p className="m-0 font-display text-[19px] font-bold">{title}</p>
      <p className="m-0 max-w-[400px] text-[15px] leading-normal text-muted-foreground">
        {text}
      </p>
    </div>
  );
}
