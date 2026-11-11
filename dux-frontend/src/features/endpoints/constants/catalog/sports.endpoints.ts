import type { Endpoint } from "../../interfaces/endpoint.interface";
import type { UpstreamPayload } from "../../types/endpoint.types";
import { asArray, plural } from "../../utils/format.utils";

export const SPORTS_ENDPOINTS: Endpoint[] = [
  {
    id: "sports-team",
    group: "Sports",
    name: "Find a team",
    description: "A club’s league, stadium and history.",
    path: "/sports/searchTeams",
    responseKey: "Sports Teams",
    params: [{ id: "t", label: "Team", required: true, example: "Arsenal", placeholder: "Arsenal" }],
    toView: (d) => {
      const list = asArray<UpstreamPayload>(d?.teams);
      return {
        kind: "list",
        caption: `${plural(list.length, "team")} found`,
        rows: list.map((x) => ({
          main: x?.strTeam,
          sub: [x?.strLeague, x?.strStadium].filter(Boolean).join(" · "),
          right: x?.intFormedYear ? `Since ${x.intFormedYear}` : "",
        })),
      };
    },
  },
  {
    id: "sports-player",
    group: "Sports",
    name: "Find a player",
    description: "A player’s position, club and nationality.",
    path: "/sports/searchPlayers",
    responseKey: "Team Players",
    params: [{ id: "p", label: "Player", required: true, example: "Bukayo Saka", placeholder: "name" }],
    toView: (d) => {
      const list = asArray<UpstreamPayload>(d?.player);
      return {
        kind: "list",
        caption: `${plural(list.length, "player")} found`,
        rows: list.map((x) => ({
          main: x?.strPlayer,
          sub: [x?.strPosition, x?.strTeam, x?.strNationality].filter(Boolean).join(" · "),
          right: x?.dateBorn ? `Born ${String(x.dateBorn).slice(0, 4)}` : "",
        })),
      };
    },
  },
  {
    id: "sports-event",
    group: "Sports",
    name: "Find a match",
    description: "The score and details of a match.",
    path: "/sports/searchEvents",
    responseKey: "Sports Events",
    params: [
      { id: "e", label: "Match", required: true, example: "Arsenal_vs_Chelsea", placeholder: "Team_vs_Team" },
      { id: "s", label: "Season", required: true, example: "2024-2025", placeholder: "2024-2025" },
    ],
    toView: (d) => {
      const list = asArray<UpstreamPayload>(d?.events);
      return {
        kind: "list",
        caption: `${plural(list.length, "match", "matches")} found`,
        rows: list.map((x) => ({
          main: x?.strEvent,
          sub: [x?.dateEvent, x?.strVenue, x?.strStatus].filter(Boolean).join(" · "),
          right: x?.intHomeScore != null && x?.intAwayScore != null ? `${x.intHomeScore} – ${x.intAwayScore}` : "",
        })),
      };
    },
  },
  {
    id: "sports-venue",
    group: "Sports",
    name: "Find a venue",
    description: "Where a stadium is and how many it holds.",
    path: "/sports/searchVenues",
    responseKey: "Sports Venues",
    params: [{ id: "v", label: "Venue", required: true, example: "Emirates", placeholder: "name" }],
    toView: (d) => {
      const list = asArray<UpstreamPayload>(d?.venues);
      return {
        kind: "list",
        caption: `${plural(list.length, "venue")} found`,
        rows: list.map((x) => ({
          main: x?.strVenue,
          sub: [x?.strLocation, x?.strCountry].filter(Boolean).join(", "),
          right: x?.intCapacity ? `${Number(x.intCapacity).toLocaleString("en")} seats` : "",
        })),
      };
    },
  },
  {
    id: "sports-league",
    group: "Sports",
    name: "League details",
    description: "Basic details about a league.",
    path: "/sports/lookUpLeague",
    responseKey: "Sports League(s)",
    params: [{ id: "id", label: "League ID", required: true, example: "4328", placeholder: "4328" }],
    toView: (d) => {
      const league = asArray<UpstreamPayload>(d?.leagues)[0] ?? {};
      return {
        kind: "hero",
        kicker: [league.strSport, league.strCountry].filter(Boolean).join(" · "),
        big: league.strLeague ?? "—",
        sub: league.idLeague ? `League ID ${league.idLeague}` : "",
        stats: [],
      };
    },
  },
  {
    id: "sports-table",
    group: "Sports",
    name: "League table",
    description: "Who’s top of the league.",
    path: "/sports/lookUpTable",
    responseKey: "Sports Table(s)",
    params: [
      { id: "l", label: "League ID", required: true, example: "4328", placeholder: "4328" },
      { id: "s", label: "Season", placeholder: "2024-2025", description: "A past season (default: current)" },
    ],
    toView: (d) => ({
      kind: "list",
      caption: "Standings",
      rows: asArray<UpstreamPayload>(d?.table).map((x) => ({
        main: `${x?.intRank}. ${x?.strTeam}`,
        sub: `Played ${x?.intPlayed} · W ${x?.intWin} D ${x?.intDraw} L ${x?.intLoss}`,
        right: `${x?.intPoints} pts`,
      })),
    }),
  },
];
