import { useEffect, useRef } from "react";
import {
  CheckIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@/components/icons";
import { GROUPS } from "../constants/endpoints.constants";
import { useEndpointSearch } from "../hooks/useEndpointSearch";
import type { EndpointMenuProps } from "../interfaces/endpoint.props";
import {
  describeRequirements,
  getEndpointsByGroup,
} from "../services/endpoint-catalog.service";
import { GroupIcon } from "./GroupIcon";

export function EndpointMenu({ current, onPick, onClose }: EndpointMenuProps) {
  const { group, setGroup, groupInfo, query, setQuery, searching, results } =
    useEndpointSearch(current.group);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      id="endpoint-menu"
      role="dialog"
      aria-label="Choose what to look up"
      className="overflow-hidden rounded-[14px] border border-border bg-card shadow-xl motion-safe:animate-rise"
    >
      <div className="flex items-center gap-2.5 border-b border-border py-3 pl-[18px] pr-3">
        <SearchIcon size={18} className="flex-none text-muted-foreground" />
        <label htmlFor="endpoint-search" className="sr-only">
          Search
        </label>
        <input
          id="endpoint-search"
          ref={searchRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do you want to find? e.g. holiday, rates, score"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent py-2 text-base text-foreground outline-none placeholder:text-muted-foreground"
        />
        <button
          type="button"
          onClick={onClose}
          className="min-h-10 flex-none rounded-lg border border-border bg-card px-3.5 text-sm font-medium hover:bg-muted"
        >
          Close
        </button>
      </div>

      <div className="flex flex-wrap">
        {!searching && (
          <nav
            aria-label="Categories"
            className="flex max-w-full flex-[1_1_200px] flex-col gap-0.5 bg-muted p-2.5"
          >
            {GROUPS.map((g) => {
              const active = g.name === group;
              return (
                <button
                  key={g.name}
                  type="button"
                  onClick={() => setGroup(g.name)}
                  aria-current={active ? "true" : undefined}
                  className={`flex min-h-12 items-center gap-3 rounded-[10px] px-3 text-left text-[15px] text-foreground ${active ? "bg-card font-semibold shadow-sm" : "font-medium hover:bg-card/60"}`}
                >
                  <span
                    className={`flex size-8 flex-none items-center justify-center rounded-lg ${active ? "bg-primary text-primary-foreground" : "bg-card text-primary"}`}
                  >
                    <GroupIcon group={g.name} size={18} />
                  </span>
                  <span className="flex-1">{g.name}</span>
                  <span className="text-[13px] font-normal text-muted-foreground">
                    {getEndpointsByGroup(g.name).length}
                  </span>
                </button>
              );
            })}
          </nav>
        )}

        <div className="flex min-w-0 flex-[999_1_360px] flex-col gap-3 p-[18px] pb-3.5">
          <div className="flex flex-col gap-0.5 px-1">
            <h3 className="m-0 font-display text-xl font-bold">
              {searching
                ? `${results.length} ${results.length === 1 ? "match" : "matches"}`
                : group}
            </h3>
            <p className="m-0 text-sm text-muted-foreground">
              {searching
                ? "Pick the one that sounds right."
                : groupInfo?.description}
            </p>
          </div>

          <div
            role="listbox"
            aria-label="Endpoints"
            className="flex flex-col gap-1.5"
          >
            {results.map((endpoint) => {
              const selected = endpoint.id === current.id;
              return (
                <button
                  key={endpoint.id}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => onPick(endpoint)}
                  className={`flex min-h-16 items-center gap-3.5 rounded-[10px] border px-3.5 py-3 text-left text-foreground ${selected ? "border-primary bg-accent/40" : "border-border bg-card hover:bg-muted"}`}
                >
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-semibold">
                        {endpoint.name}
                      </span>
                      {searching && (
                        <span className="text-xs text-muted-foreground">
                          in {endpoint.group}
                        </span>
                      )}
                    </span>
                    <span className="text-sm leading-snug text-muted-foreground">
                      {endpoint.description}
                    </span>
                    <span className="mt-0.5 self-start rounded-md bg-accent px-2 py-0.5 text-[12.5px] text-accent-foreground">
                      {describeRequirements(endpoint)}
                    </span>
                  </span>
                  {selected ? (
                    <span className="inline-flex flex-none items-center gap-1 text-[13px] font-semibold text-primary">
                      <CheckIcon size={16} />
                      Chosen
                    </span>
                  ) : (
                    <ChevronRightIcon
                      size={18}
                      className="flex-none text-muted-foreground"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {searching && results.length === 0 && (
            <div className="flex flex-col gap-1.5 px-2 py-6 text-center">
              <p className="m-0 font-semibold">Nothing matches “{query}”</p>
              <p className="m-0 text-sm text-muted-foreground">
                Try a simpler word like “weather”, “money” or “team”.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
