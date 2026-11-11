import type { ResultListProps } from "../interfaces/lookup.props";

export function ResultList({ view }: ResultListProps) {
  return (
    <div className="flex flex-col">
      <p className="m-0 px-5 pb-1 pt-4 text-sm text-muted-foreground">
        {view.caption}
      </p>
      <ul className="m-0 list-none p-0">
        {view.rows.map((row, index) => (
          <li
            key={index}
            className="flex items-center justify-between gap-4 border-t border-border px-5 py-3.5"
          >
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-base font-semibold">{row.main}</span>
              {row.sub && (
                <span className="text-sm text-muted-foreground">{row.sub}</span>
              )}
            </div>
            {row.right && (
              <span className="flex-none text-right font-display text-[17px] font-semibold">
                {row.right}
              </span>
            )}
          </li>
        ))}
      </ul>
      {view.rows.length === 0 && (
        <p className="m-0 px-5 pb-5 text-sm text-muted-foreground">
          No results for those details.
        </p>
      )}
    </div>
  );
}
