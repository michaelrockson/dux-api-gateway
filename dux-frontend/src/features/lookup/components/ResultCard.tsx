import { useMemo } from "react";
import type { ResultCardProps } from "../interfaces/lookup.props";
import { toResultView } from "../services/lookup.service";
import type { ResultState } from "../types/lookup.types";
import { ResultHero } from "./ResultHero";
import { ResultList } from "./ResultList";
import { ResultMessage } from "./ResultMessage";
import { ResultRaw } from "./ResultRaw";

function statusLine(result: ResultState): string {
  switch (result.status) {
    case "success":
      return "OK";
    case "loading":
      return "Looking it up…";
    case "error":
      return result.httpStatus
        ? `Didn’t work · ${result.httpStatus}`
        : "Didn’t work";
    default:
      return "Not run yet";
  }
}

export function ResultCard({ endpoint, result, ready }: ResultCardProps) {
  const success = result.status === "success" ? result : null;

  const view = useMemo(
    () =>
      success ? toResultView(endpoint, success.data, success.values) : null,
    [endpoint, success],
  );
  // Raw data is only a fallback for endpoints with no readable view.
  const showRaw = !!success && !view;

  return (
    <section
      aria-label="Result"
      aria-live="polite"
      aria-busy={result.status === "loading"}
      className="overflow-hidden rounded-[14px] border border-border bg-card"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2 className="m-0 font-display text-[19px] font-bold">
            {endpoint.name}
          </h2>
        </div>
      </div>

      {result.status === "idle" &&
        (ready ? (
          <ResultMessage
            title="Ready when you are"
            text="Press Go and the answer will appear here."
          />
        ) : (
          <ResultMessage
            title="A few details to go"
            text="Fill in the highlighted boxes above, then press Go."
          />
        ))}

      {result.status === "loading" && (
        <div className="flex flex-col gap-3 p-7" aria-hidden="true">
          <div className="h-4 w-40 animate-pulse rounded bg-muted motion-reduce:animate-none" />
          <div className="h-14 w-56 animate-pulse rounded bg-muted motion-reduce:animate-none" />
          <div className="h-4 w-72 animate-pulse rounded bg-muted motion-reduce:animate-none" />
        </div>
      )}

      {result.status === "error" && (
        <ResultMessage
          tone="error"
          title="That didn’t work"
          text={result.message}
        />
      )}

      {!showRaw && view?.kind === "hero" && <ResultHero view={view} />}
      {!showRaw && view?.kind === "list" && <ResultList view={view} />}
      {showRaw && <ResultRaw raw={success?.raw} />}
    </section>
  );
}
