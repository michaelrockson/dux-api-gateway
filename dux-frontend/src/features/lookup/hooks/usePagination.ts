import { useMemo, useState } from "react";

export interface Pagination<T> {
  items: T[];
  page: number;
  pageCount: number;
  from: number;
  to: number;
  total: number;
  setPage: (page: number) => void;
}

/** Splits `all` into pages; jumps back to page 1 whenever `all` changes. */
export function usePagination<T>(all: T[], pageSize: number): Pagination<T> {
  const [state, setState] = useState({ source: all, page: 1 });
  const pageCount = Math.max(1, Math.ceil(all.length / pageSize));
  const page = state.source === all ? Math.min(state.page, pageCount) : 1;
  const start = (page - 1) * pageSize;

  const items = useMemo(
    () => all.slice(start, start + pageSize),
    [all, start, pageSize],
  );

  return {
    items,
    page,
    pageCount,
    from: all.length === 0 ? 0 : start + 1,
    to: Math.min(start + pageSize, all.length),
    total: all.length,
    setPage: (next) =>
      setState({
        source: all,
        page: Math.min(Math.max(1, next), pageCount),
      }),
  };
}
