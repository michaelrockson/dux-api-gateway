import type { ListRow, ListView } from "../interfaces/endpoint.interface";
import { capitalise } from "./format.utils";

const TITLE_KEYS = ["name", "title", "label", "description", "id"];
const MAX_DETAILS = 3;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** "created_at" / "createdAt" → "Created at" */
const readableKey = (key: string): string =>
  capitalise(
    key
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/[_-]+/g, " ")
      .trim()
      .toLowerCase(),
  );

function readableValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) {
    return value.every((item) => typeof item !== "object" || item === null)
      ? value.map(readableValue).join(", ")
      : `${value.length} ${value.length === 1 ? "item" : "items"}`;
  }
  if (isRecord(value)) {
    const title = TITLE_KEYS.map((key) => value[key]).find(
      (item) => typeof item === "string" || typeof item === "number",
    );
    return title !== undefined ? String(title) : "-";
  }
  return String(value);
}

/** One row per field: label on the left, value on the right. */
function fieldRows(record: Record<string, unknown>): ListRow[] {
  return Object.entries(record).flatMap(([key, value]): ListRow[] => {
    if (isRecord(value)) {
      return Object.entries(value)
        .filter(([, inner]) => !isRecord(inner))
        .map(([innerKey, inner]) => ({
          main: `${readableKey(key)} · ${readableKey(innerKey).toLowerCase()}`,
          right: readableValue(inner),
        }));
    }
    return [{ main: readableKey(key), right: readableValue(value) }];
  });
}

/** One row per item: its name, then a few of its other details. */
function itemRow(item: unknown, index: number): ListRow {
  if (!isRecord(item)) return { main: readableValue(item) };

  const titleKey = TITLE_KEYS.find(
    (key) => typeof item[key] === "string" || typeof item[key] === "number",
  );
  const details = Object.entries(item)
    .filter(([key, value]) => key !== titleKey && !isRecord(value))
    .slice(0, MAX_DETAILS)
    .map(([key, value]) => `${readableKey(key)}: ${readableValue(value)}`);

  return {
    main: titleKey ? String(item[titleKey]) : `Result ${index + 1}`,
    sub: details.join(" · ") || undefined,
  };
}

/**
 * Readable view for any payload, used when an endpoint has no view of its
 * own (or its view fails) so results are never shown as raw data.
 */
export function toFallbackView(data: unknown): ListView {
  if (Array.isArray(data)) return { kind: "list", rows: data.map(itemRow) };

  if (isRecord(data)) {
    // A wrapper around a single list ({ data: [...] }) reads best as that list.
    const lists = Object.values(data).filter(Array.isArray);
    const onlyList = lists.length === 1 ? lists[0] : null;
    if (onlyList && onlyList.some(isRecord)) {
      return { kind: "list", rows: onlyList.map(itemRow) };
    }
    return { kind: "list", rows: fieldRows(data) };
  }

  if (data === null || data === undefined || data === "") {
    return { kind: "list", rows: [] };
  }
  return { kind: "list", rows: [{ main: readableValue(data) }] };
}
