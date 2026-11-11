import type {
  Endpoint,
  ListRow,
  ListView,
} from "../../interfaces/endpoint.interface";
import type { UpstreamPayload } from "../../types/endpoint.types";
import { asArray, capitalise } from "../../utils/format.utils";

const joined = (...parts: unknown[]): string =>
  parts.filter(Boolean).join(" · ");

function listView(
  d: UpstreamPayload,
  toRow: (item: UpstreamPayload) => ListRow,
): ListView {
  return {
    kind: "list",
    rows: asArray<UpstreamPayload>(d?.data ?? d).map(toRow),
  };
}

const flights = (d: UpstreamPayload): ListView =>
  listView(d, (f) => {
    const from = f?.departure?.airport ?? f?.departure?.iata ?? "Unknown";
    const to = f?.arrival?.airport ?? f?.arrival?.iata ?? "Unknown";
    return {
      main: `${from} → ${to}`,
      sub: joined(
        f?.airline?.name,
        f?.flight?.iata ?? f?.flight?.number,
        f?.flight_date,
      ),
      right: f?.flight_status
        ? capitalise(String(f.flight_status))
        : undefined,
    };
  });

const airports = (d: UpstreamPayload): ListView =>
  listView(d, (a) => ({
    main: a?.airport_name ?? "Unnamed airport",
    sub: joined(a?.country_name, a?.timezone),
    right: a?.iata_code ?? a?.icao_code ?? undefined,
  }));

const airlines = (d: UpstreamPayload): ListView =>
  listView(d, (a) => ({
    main: a?.airline_name ?? "Unnamed airline",
    sub: joined(a?.country_name, a?.status && capitalise(String(a.status))),
    right: a?.iata_code ?? a?.icao_code ?? undefined,
  }));

export const AVIATION_ENDPOINTS: Endpoint[] = [
  { id: "aviation-flights", group: "Flights", name: "Live flights", description: "Flights in the air right now.", path: "/aviation/flights", responseKey: "Current Flights", params: [], toView: flights },
  { id: "aviation-airports", group: "Flights", name: "Airports", description: "Airports and their details.", path: "/aviation/airports", responseKey: "Airports", params: [], toView: airports },
  { id: "aviation-airlines", group: "Flights", name: "Airlines", description: "Airlines and their details.", path: "/aviation/airlines", responseKey: "Flight Airlines", params: [], toView: airlines },
];
