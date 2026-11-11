import type {
  Endpoint,
  ListView,
  Param,
} from "../../interfaces/endpoint.interface";
import type { UpstreamPayload } from "../../types/endpoint.types";
import { asArray, plural } from "../../utils/format.utils";

const countryCode: Param = { id: "countryCode", label: "Country code", required: true, example: "GH", placeholder: "GH" };
const year: Param = { id: "year", label: "Year", required: true, example: String(new Date().getFullYear()), placeholder: "2026" };

function holidays(d: UpstreamPayload): ListView {
  const list = asArray<UpstreamPayload>(d);
  return {
    kind: "list",
    caption: plural(list.length, "holiday"),
    rows: list.map((h) => ({
      main: h?.localName && h?.localName !== h?.name ? `${h.name} (${h.localName})` : h?.name,
      sub: `${h?.countryCode ?? ""}${h?.nationalHoliday ? " · nationwide" : " · some regions only"}`,
      right: h?.date,
    })),
  };
}

export const HOLIDAY_ENDPOINTS: Endpoint[] = [
  {
    id: "holiday-year",
    group: "Holidays",
    name: "Holidays in a year",
    description: "Every public holiday in a country for a year.",
    path: "/holiday/PublicHolidays",
    responseKey: "Public Holidays",
    params: [year, countryCode],
    toView: holidays,
  },
  {
    id: "holiday-next",
    group: "Holidays",
    name: "Coming up",
    description: "The next public holidays in a country.",
    path: "/holiday/NextPublicHolidays",
    responseKey: "Next Public Holidays",
    params: [countryCode],
    toView: holidays,
  },
  {
    id: "holiday-today",
    group: "Holidays",
    name: "Is today a holiday?",
    description: "A quick yes or no for today.",
    path: "/holiday/IsTodayPublicHoliday",
    responseKey: "Is Today Public Holiday",
    params: [countryCode],
    toView: (d, v) => ({
      kind: "hero",
      kicker: `In ${v.countryCode || "…"} today`,
      big: d ? "Yes" : "No",
      sub: d ? "Today is a public holiday." : "Today is a normal working day.",
      stats: [],
    }),
  },
  {
    id: "holiday-long-weekend",
    group: "Holidays",
    name: "Long weekends",
    description: "Weekends you can stretch with a holiday.",
    path: "/holiday/LongWeekend",
    responseKey: "Long Weekend",
    params: [year, countryCode],
    toView: (d) => {
      const list = asArray<UpstreamPayload>(d);
      return {
        kind: "list",
        caption: plural(list.length, "long weekend"),
        rows: list.map((x) => ({
          main: `${x?.startDate} → ${x?.endDate}`,
          sub: x?.needBridgeDay ? "Needs one day off" : "No days off needed",
          right: `${x?.dayCount} days`,
        })),
      };
    },
  },
  {
    id: "holiday-worldwide",
    group: "Holidays",
    name: "Coming up worldwide",
    description: "The next holidays anywhere in the world.",
    path: "/holiday/NextPublicHolidaysWorldwide",
    responseKey: "Next Public Holidays Worldwide",
    params: [],
    toView: holidays,
  },
  {
    id: "holiday-country",
    group: "Holidays",
    name: "Country info",
    description: "Official name, region and neighbours.",
    path: "/holiday/CountryInfo",
    responseKey: "Country Info",
    params: [countryCode],
    toView: (d) => ({
      kind: "hero",
      kicker: d?.region ?? "",
      big: d?.commonName ?? "—",
      sub: d?.officialName ?? "",
      stats: [
        { label: "Code", value: d?.countryCode ?? "—" },
        {
          label: "Borders",
          value:
            asArray<UpstreamPayload>(d?.borders)
              .map((b) => b?.commonName)
              .join(", ") || "None",
        },
      ],
    }),
  },
  {
    id: "holiday-countries",
    group: "Holidays",
    name: "Countries covered",
    description: "Which countries have holiday info.",
    path: "/holiday/AvailableCountries",
    responseKey: "Available Countries",
    params: [],
    toView: (d) => {
      const list = asArray<UpstreamPayload>(d);
      return {
        kind: "list",
        caption: plural(list.length, "country", "countries"),
        rows: list.map((x) => ({ main: x?.name, right: x?.countryCode })),
      };
    },
  },
];
