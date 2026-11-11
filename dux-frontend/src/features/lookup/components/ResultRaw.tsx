import { useMemo } from "react";
import { usePagination } from "../hooks/usePagination";
import type { ResultRawProps } from "../interfaces/lookup.props";
import { ResultPager } from "./ResultPager";

const LINES_PER_PAGE = 100;

export function ResultRaw({ raw }: ResultRawProps) {
  const lines = useMemo(
    () => (JSON.stringify(raw, null, 2) ?? "").split("\n"),
    [raw],
  );
  const pagination = usePagination(lines, LINES_PER_PAGE);

  return (
    <div className="flex flex-col">
      <pre className="m-0 overflow-x-auto bg-foreground p-5 font-mono text-[13px] leading-relaxed text-background">
        {pagination.items.join("\n")}
      </pre>
      <ResultPager pagination={pagination} noun="lines" />
    </div>
  );
}
